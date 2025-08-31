import { useAppSelector } from "../../store";
import Button from "../ui/Button";
import CreateUser from "../user/CreateUser";

function Home() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <div className="font-pizza my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!username && <CreateUser />}
      {username && (
        <Button type="primary" to="/menu">
          Continue ordering!
        </Button>
      )}
    </div>
  );
}

export default Home;
