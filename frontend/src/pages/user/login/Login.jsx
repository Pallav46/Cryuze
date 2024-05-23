import { useState } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import useUserLogin from "../../../hooks/user/useUserLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useUserLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login function from the hook
    await login({ email, password });
  };

  return (
    <div>
      {/* <h1 className="text-white font-bold text-8xl flex justify-center align-middle uppercase bg-zinc-800 p-4">
        Login
      </h1> */}
      <div className="w-[100%] absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex align-middle justify-center rounded-3xl">
        <Card className="max-w-sm bg-zinc-800 border-3 w-[100%] rounded-3xl">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className='uppercase font-bold text-[3vw] text-white'>
                    Login
                </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  className="text-white"
                  value="Your email"
                />
              </div>
              <TextInput
                id="email1"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password1"
                  className="text-white"
                  value="Your password"
                />
              </div>
              <TextInput
                id="password1"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <a
              href="/forget"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Forgot Password?
            </a>
            <div className="text-white text-sm font-semibold">
              <a
                href="/register"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                New here?
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-white">
                Remember me
              </Label>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Submit"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
