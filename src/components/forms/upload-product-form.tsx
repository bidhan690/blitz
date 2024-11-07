"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  UncontrolledFormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getSubcategories, productsCategories } from "@/config/products";
import { uploadProductSchema } from "@/lib/validations/product";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { FileWithPreview } from "@/types";
import { Zoom } from "../zoom-image";
import Image from "next/image";
import { Icons } from "../icons";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import { catchError, isArrayOfFile, toTitleCase } from "@/lib/utils";
import { uploadProduct } from "@/_actions/uploadProduct";
import { toast } from "sonner";
import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

const FileDialog = dynamic(() => import("../FileDialog"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-8 " />,
});

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
type Inputs = z.infer<typeof uploadProductSchema>;

const UploadProductForm = ({}) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(uploadProductSchema),
    defaultValues: {
      category: "clothing",
    },
  });

  const subCategories = getSubcategories(form.watch("category"));

  const [files, setFiles] = useState<FileWithPreview[] | null>(null);
  const [isPending, startTransition] = useTransition();

    const { startUpload } = useUploadThing("imageUploader",{
         
    onUploadError: () => {
      setFiles(null);
      throw new Error("Please try again uploading the image.");
    },
   
    })
  
 

  function onSubmit(data: Inputs) {
    if (!data || !data.images) return;
    startTransition(async () => {
      try {
        // const formData = new FormData();
        // for (let i = 0; i < data.images.length; i++) {
          //   // @ts-ignore
          //   formData.append(`files${i}`, data.images[i]);
          // @ts-ignore Temporary fix for zod buffer types
    const images =  await startUpload(data.images)
          await uploadProduct({ ...data,images:images?.map((image) => image.url) });
        form.reset()
        setFiles(null);
        toast.success("Successully added product.");
      } catch (err: any) {
        catchError(err)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        autoFocus={false}
        className="flex flex-col space-y-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              {...form.register("name")}
              type="text"
              placeholder="Type product name here."
              className=""
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.name?.message}
          />
        </FormItem>

        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              {...form.register("description")}
              placeholder="Type product description here."
              className=""
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.description?.message}
          />
        </FormItem>
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {productsCategories.map((item) => (
                          <SelectItem
                            key={item.title}
                            value={item.title.toLowerCase()}
                          >
                            {toTitleCase(item.title)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subcategory</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subCategories.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value.toLowerCase()}
                          >
                            {toTitleCase(item.label)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                {...form.register("price")}
                type="number"
                placeholder="Type product price here."
                className=""
              />
            </FormControl>

            <UncontrolledFormMessage
              message={form.formState.errors.price?.message}
            />
          </FormItem>

          <FormItem>
            <FormLabel>In Stock</FormLabel>
            <FormControl>
              <Input
                {...form.register("quantity")}
                type="number"
                placeholder="Type product quantity here."
                className=""
              />
            </FormControl>

            <UncontrolledFormMessage
              message={form.formState.errors.price?.message}
            />
          </FormItem>
        </div>

        <FormItem className="flex w-full flex-col gap-1.5">
          <FormLabel>Images</FormLabel>
          {files?.length ? (
            <div className="flex items-center gap-2">
              {files.map((file, i) => (
                <Zoom key={i}>
                  <Image
                    src={file.preview}
                    alt={file.name}
                    className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                    width={80}
                    height={80}
                  />
                </Zoom>
              ))}
            </div>
          ) : null}

          <FormControl>
            <FileDialog
              name="images"
              disabled={isPending}
              //@ts-ignore
              setValue={form.setValue}
              files={files}
              setFiles={setFiles}
            />
          </FormControl>
          <UncontrolledFormMessage
            message={form.formState.errors.images?.message}
          />
        </FormItem>

        <Button
          disabled={isPending}
          size="lg"
          className="w-36"
          onClick={() =>
            void form.trigger(["name", "description", "price", "quantity"])
          }
        >
          {isPending ? (
            <>
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              "Adding..."
            </>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UploadProductForm;
