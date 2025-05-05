import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { ProductModel } from "../../../entities/Product";
import { useUserStore } from "../../../store/user-store";
import { formatCurrency } from "../../../utilities/formatCurrency";
interface Props {
  product: ProductModel;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/marketplace/item/${product.productId}`);
  };
  const { userId } = useUserStore();
  return (
    <Box
      overflow="hidden"
      mt="20px"
      cursor="pointer"
      onClick={handleNavigateClick}
      position="relative"
      maxWidth="250px"
    >
      <Image
        src={
          product.productImages?.[0].productImage ||
          "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        }
        width="100%"
        height="100%"
        // objectFit="cover"
        boxSize="250px"
        borderRadius="8px"
      />

      <Text fontWeight="semibold" fontSize="lg" mt="5px">
        {formatCurrency(product.price)}
      </Text>
      <Text textTransform="capitalize" isTruncated={true}>
        {product.productName}
      </Text>
      {userId === product.user.userId && (
        <Box position="absolute" zIndex="5" top="5px" right="5px">
          <Avatar src={product.user.profilePicture || pic} size="sm" />
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;
