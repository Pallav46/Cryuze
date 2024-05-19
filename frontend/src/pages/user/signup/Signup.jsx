import { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import useUserSignup from "../../../hooks/user/useUserSignup";
import toast from "react-hot-toast";

export function Signup() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const { signup, isLoading, error } = useUserSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if password and repeat password match
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Call the signup function from the hook
    await signup({ name, phoneNumber, email, password });
  };

  return (
    <div>
      <h1 className="text-white font-bold text-8xl flex justify-center align-middle uppercase bg-zinc-800 p-4 mb-2">
        Signup
      </h1>
      <div className="w-[40%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[40%] flex align-middle justify-center border-2 pt-[2%] bg-zinc-800 rounded-3xl">
        <form
          className="flex max-w-md flex-col gap-4 w-[100%] mb-[2vw]"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                className="font-semibold text-white"
                value="Your Name"
              />
            </div>
            <TextInput
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Smith"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="phoneNumber"
                className="font-semibold text-white"
                value="Your Phone Number"
              />
            </div>
            <TextInput
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder=""
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email"
                className="font-semibold text-white"
                value="Your email"
              />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@gmail.com"
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="password"
                className="font-semibold text-white"
                value="Your password"
              />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              shadow
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="repeat-password"
                className="font-semibold text-white"
                value="Repeat password"
              />
            </div>
            <TextInput
              id="repeat-password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              shadow
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="text-white text-sm font-semibold">
            <a
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Already a member?
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <Label htmlFor="agree" className="flex text-white">
              I agree with the&nbsp;
              <a
                href="#"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </a>
            </Label>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Register new account"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
