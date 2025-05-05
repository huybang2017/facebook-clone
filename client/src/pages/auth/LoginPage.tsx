import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/user/Input/PasswordInput";
import TextInput from "../../components/user/Input/TextInput";
import Login from "../../components/user/LoginPage/Login";
import { User } from "../../entities/User";
import useRegister from "../../hooks/user/useRegister";
import { useAuthQueryStore } from "../../store/auth-store";

const LoginPage = () => {
  const {
    register: registerUser,
    handleSubmit: handleRegisterSubmit,
    loading,
    onSubmit: onSubmitRegister,
    errors: registerErrors,
    isOpen,
    onOpen,
    onClose,
    control,
  } = useRegister();
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1905 + 1 }, (_, i) =>
    (i + 1905).toString()
  ).reverse();

  const months = [
    { name: "Jan", value: "01" },
    { name: "Feb", value: "02" },
    { name: "Mar", value: "03" },
    { name: "Apr", value: "04" },
    { name: "May", value: "05" },
    { name: "Jun", value: "06" },
    { name: "Jul", value: "07" },
    { name: "Aug", value: "08" },
    { name: "Sep", value: "09" },
    { name: "Oct", value: "10" },
    { name: "Nov", value: "11" },
    { name: "Dec", value: "12" },
  ];

  const [year, setYear] = useState<string>(currentYear.toString());
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);

  const daysInMonth = (month: string, year: string): number => {
    return new Date(parseInt(year), parseInt(month), 0).getDate();
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
  };

  const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(event.target.value);
  };

  useEffect(() => {
    if (month && year) {
      const numberOfDays = daysInMonth(month, year);
      const newDays = Array.from({ length: numberOfDays }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );
      setDays(newDays);
    }
  }, [month, year]);

  const onSubmitRegisterHandler = (data: User) => {
    if (month && day && year) {
      data.dateOfBirth = `${year}-${month}-${day}`;
    }
    onSubmitRegister(data);
  };

  const [selectedGender, setSelectedGender] = useState<string>("");
  const handleSelectedGenderClick = (value: string) => {
    setSelectedGender(value);
  };

  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const role = authStore.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "USER") {
      navigate("/home");
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  }, [jwtToken, navigate]);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-evenly"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        as="section"
        mt={{ base: "50px", lg: "120px", xl: "85px" }}
      >
        <Box
          display="flex"
          flexDirection="column"
          mb={{ base: "20px", xl: "0px" }}
          mr={{ base: "0px", md: "100px" }}
        >
          <Text
            fontSize={{ base: "xx-large", md: "xxx-large" }}
            color="#1877F2"
            fontWeight="bold"
          >
            facebook
          </Text>
          <Text fontSize={{ base: "lg", md: "xl", lg: "x-large" }}>
            Connect with friends and the world
          </Text>
          <Text fontSize={{ base: "lg", md: "xl", lg: "x-large" }}>
            around you on Facebook
          </Text>
        </Box>
        <Center>
          <Card w={{ base: "250px", md: "400px", lg: "350px", xl: "400px" }}>
            <Box p={{ base: 1, md: 2 }} borderWidth={1} borderRadius="md">
              <CardBody>
                <Login />
                <Text
                  textAlign="center"
                  mt="20px"
                  color="#1877F2"
                  cursor="pointer"
                >
                  Forget Password?
                </Text>
                <Divider mt="20px" mb="20px" />
                <Center>
                  <Button
                    bg="#2db300"
                    _hover={{ bg: "#269900" }}
                    _active={{ bg: "#269900" }}
                    onClick={onOpen}
                  >
                    Create New Account
                  </Button>
                </Center>
              </CardBody>
            </Box>
          </Card>
        </Center>
      </Box>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
          <ModalOverlay />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleRegisterSubmit(onSubmitRegisterHandler)(event);
            }}
          >
            <ModalContent>
              <ModalCloseButton />
              <ModalBody mt="10px">
                <Box>
                  <Text
                    fontSize="x-large"
                    fontWeight="semibold"
                    textTransform="capitalize"
                  >
                    Sign Up
                  </Text>
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    color="gray.500"
                  >
                    It's quick and easy.
                  </Text>
                  <Divider mb="15px" mt="15px" />
                  <Stack spacing={3}>
                    <Box display="flex">
                      <TextInput
                        control={control}
                        name="firstName"
                        loading={loading}
                        placeholder="First Name"
                        label="First Name"
                        mr="5px"
                      />
                      <TextInput
                        control={control}
                        name="lastName"
                        loading={loading}
                        placeholder="Last Name"
                        label="Last Name"
                        ml="5px"
                      />
                    </Box>
                    <TextInput
                      control={control}
                      name="email"
                      loading={loading}
                      placeholder="Email"
                      label="email"
                    />
                    <PasswordInput
                      control={control}
                      name="password"
                      loading={loading}
                      placeholder="Password"
                      label="Password"
                    />
                    <PasswordInput
                      control={control}
                      name="confirmPassword"
                      loading={loading}
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
                    <FormControl isRequired>
                      <Text fontSize="xs" mb="2px">
                        Birthday
                      </Text>
                      <Box
                        display="flex"
                        justifyContent="space-evenly"
                        {...registerUser("dateOfBirth")}
                      >
                        <Select
                          id="year"
                          mr="5px"
                          onChange={handleYearChange}
                          value={year}
                        >
                          {years.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </Select>
                        <Select
                          id="month"
                          mr="5px"
                          onChange={handleMonthChange}
                          value={month}
                        >
                          <option value="" disabled hidden>
                            Month
                          </option>
                          {months.map((value) => (
                            <option key={value.value} value={value.value}>
                              {value.name}
                            </option>
                          ))}
                        </Select>
                        <Select
                          id="day"
                          mr="5px"
                          onChange={handleDayChange}
                          value={day}
                          isDisabled={month === ""}
                        >
                          <option value="" disabled hidden>
                            Day
                          </option>
                          {days.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </Select>
                      </Box>
                      {registerErrors.dateOfBirth && (
                        <Text color="red">
                          {registerErrors.dateOfBirth.message}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl isRequired>
                      <Text fontSize="xs" mb="2px">
                        Gender
                      </Text>
                      <Controller
                        name="gender"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <RadioGroup
                            onChange={(value) => {
                              handleSelectedGenderClick(value);
                              field.onChange(value);
                            }}
                            value={selectedGender}
                          >
                            <Box display="flex" flexDirection="row">
                              <Radio value="MALE" mr="30px">
                                Male
                              </Radio>
                              <Radio value="FEMALE">Female</Radio>
                            </Box>
                          </RadioGroup>
                        )}
                      />
                      {registerErrors.gender && (
                        <Text color="red">{registerErrors.gender.message}</Text>
                      )}
                    </FormControl>

                    <FormControl>
                      <Input
                        {...registerUser("role")}
                        defaultValue="USER"
                        type="hidden"
                      />
                    </FormControl>
                  </Stack>
                </Box>
                <ModalFooter justifyContent="center" mb="10px">
                  <Button
                    type="submit"
                    bg="#2db300"
                    _hover={{ bg: "#269900" }}
                    _active={{ bg: "#269900" }}
                    width="150px"
                    isLoading={loading}
                  >
                    Sign Up
                  </Button>
                </ModalFooter>
              </ModalBody>
            </ModalContent>
          </form>
        </Modal>
      </Box>
    </>
  );
};

export default LoginPage;
