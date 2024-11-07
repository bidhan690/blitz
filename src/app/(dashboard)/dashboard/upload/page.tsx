import UploadProductForm from "@/components/forms/upload-product-form";
import { Shell } from "@/components/shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  return (
    <Shell>
      <Card>
        <CardHeader>
          <CardTitle>Add product</CardTitle>
          <CardDescription>Add a new product to your store</CardDescription>
        </CardHeader>
        <CardContent>
          <UploadProductForm />
        </CardContent>
      </Card>
    </Shell>
  );
};

export default page;
