"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Accept,
  FileRejection,
  FileWithPath,
  useDropzone,
} from "react-dropzone";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { FileWithPreview } from "@/types";
import Image from "next/image";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import { toast } from "sonner";

interface FileDialogProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  name: TName;
  setValue: UseFormSetValue<TFieldValues>;
  files: FileWithPreview[] | null;
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>;
  accept?: Accept;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

function FileDialog<TFieldValues extends FieldValues>({
  name,
  setValue,
  files,
  setFiles,
  accept = { "image/*": [] },
  maxFiles = 3,
  className,
  disabled = false,
}: FileDialogProps<TFieldValues>) {
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFiles((prev) => [...(prev ?? []), fileWithPreview]);
      });
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ errors }) => {
          errors[0].message && toast.error(errors[0].message);
        });
      }
    },
    [setFiles],
  );

  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
  });

  useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled} size="sm">
          Upload Images
        </Button>
      </DialogTrigger>
      <DialogContent>
        <p className="absolute top-4 left-5 text-base font-medium text-muted-foreground">
          Upload your images
        </p>
        <div className="flex flex-col gap-y-3">
          <div
            {...getRootProps()}
            className={cn(
              "group relative mt-8 grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-muted-foreground/50",
              disabled && "pointer-events-none opacity-60",
              className,
            )}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="grid place-items-center gap-1">
                <Icons.upload size={24} className="animate-bounce" />
                <p>Drop the files here ...</p>
              </div>
            ) : (
              <div className="grid place-items-center gap-2">
                <Icons.upload size={24} />
                <p>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-center font-medium text-muted-foreground">
              You can upload up to 3 files
            </p>
            {files?.length
              ? files?.map((file, i) => (
                  <FileCard
                    key={i}
                    i={i}
                    files={files}
                    setFiles={setFiles}
                    file={file}
                  />
                ))
              : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FileDialog;

interface FileCardProps {
  i: number;
  file: FileWithPreview;
  files: FileWithPreview[] | null;
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>;
}

const FileCard: FC<FileCardProps> = ({ file, files, setFiles, i }) => {
  const [open, setOpen] = useState(false);
  const [croppedData, setCroppedData] = useState<string | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    if (!files || !cropperRef.current) return;
    const croppedFile = cropperRef.current?.cropper?.getCroppedCanvas();
    setCroppedData(croppedFile?.toDataURL());

    croppedFile?.toBlob((blob) => {
      if (!blob) return;
      const croppedImage = new File([blob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      const croppedFileWithPreview = Object.assign(croppedImage, {
        preview: URL.createObjectURL(croppedImage),
        path: file.name,
      }) satisfies FileWithPreview;

      const newFiles = files.map((file, j) =>
        j === i ? croppedFileWithPreview : file,
      );
      setFiles(newFiles);
    });
  }, [files, file.name, file.type, i, setFiles]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Image
          src={croppedData ? croppedData : file.preview}
          alt={file.name}
          className="h-10 w-10 shrink-0 rounded-md"
          width={40}
          height={40}
          loading="lazy"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="text-muted-foreground"
            >
              <Icons.crop size={14} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <p className="absolute left-5 top-4 text-base font-medium text-muted-foreground">
              Crop image
            </p>
            <div className="flex flex-col gap-3 mt-8">
              <Cropper
                ref={cropperRef}
                className="h-[450px] w-[450px] object-cover"
                zoomTo={0}
                initialAspectRatio={1 / 1}
                preview=".img-preview"
                src={file.preview}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                guides={true}
              />
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => {
                    onCrop();
                    setOpen(false);
                  }}
                  variant="outline"
                >
                  <Icons.crop size={14} className="mr-2" />
                  Crop
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    cropperRef.current?.cropper.reset();
                    setCroppedData(null);
                  }}
                >
                  <Icons.reset size={14} className="mr-2" /> Reset
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          size="sm"
          onClick={() => setFiles(files!.filter((item, j) => i !== j))}
          variant="outline"
          className="text-muted-foreground"
        >
          <Icons.close size={14} />
        </Button>
      </div>
    </div>
  );
};
