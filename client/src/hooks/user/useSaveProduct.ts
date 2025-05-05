import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface SaveProductProps {
  category: string;
  productCondition: string;
  availability: string;
  productName: string;
  price: number;
  brand?: string;
  description?: string;
  file: FileList;
}

const useSaveProduct = () => {
  const toast = useToast();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } =
    useForm<SaveProductProps>();
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [imagePreview, setImagePreview] = useState<string[] | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [productCondition, setProductCondition] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/product/save`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allProducts", 20]);
        queryClient.invalidateQueries(["listedUserProducts"]);
        setLoading(false);
        reset();
        setImageFile(null);
        setImagePreview(null);
        setProductName("");
        setProductCondition("");
        setBrand("");
        setDescription("");
        setPrice("");
      },
      onError: (error: any) => {
        setLoading(false);

        if (error.response?.data.errorMessage) {
          toast({
            title: "Error uploading image.",
            description: error.response.data.errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      },
    }
  );

  const onSubmit: SubmitHandler<SaveProductProps> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            category: data.category,
            productCondition: data.productCondition,
            availability: data.availability,
            productName: data.productName,
            price: data.price,
            brand: data.brand,
            description: data.description,
          }),
        ],
        { type: "application/json" }
      )
    );
    Array.from(data.file).forEach((file) => {
      formData.append("file", file);
    });

    await mutation.mutate(formData);
  };

  return {
    loading,
    onSubmit,
    register,
    handleSubmit,
    imageFile,
    setImageFile,
    setValue,
    setImagePreview,
    imagePreview,
    productName,
    setProductName,
    productCondition,
    setProductCondition,
    brand,
    setBrand,
    description,
    setDescription,
    price,
    setPrice,
  };
};

export default useSaveProduct;
