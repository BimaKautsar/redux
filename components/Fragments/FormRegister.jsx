import InputForm from "../Elements/Input";
import Button from "../Elements/Button";

const FormRegister = () => {
  return (
    <form action="">
      <InputForm
        label="Fullname"
        placeholder="Please insert your fullname"
        type="text"
        name="fullname"
      />
      <InputForm
        label="Email"
        placeholder="Example@gmail.com"
        type="email"
        name="email"
      />
      <InputForm
        label="Password"
        name="password"
        type="password"
        placeholder="********"
      />
      <InputForm
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="********"
      />
      <Button classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Register
      </Button>
    </form>
  );
};

export default FormRegister;
