import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-black w-full h-[200px] flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="App Logo" width={40} height={40} />
        <h1 className="text-4xl font-bold space-x-1">
          <span className="text-customBlue">Todo</span>
          <span className="text-customPurple">App</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
