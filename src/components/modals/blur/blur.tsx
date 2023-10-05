import Link from "next/link";

const Blur = ({}: // setVisibility,
// visibility,
{
  // setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  // visibility: boolean;
}) => {
  return (
    <Link
      href={"?modal"}
      className={`cursor-default fixed z-40 top-0 left-0 h-full w-full bg-slate-900/70 transition-all duration-500 
        // visibility ? "opacity-70 duration-500" : "opacity-0 hidden"`}
      // onClick={() => setVisibility(false)}
    ></Link>
  );
};

export default Blur;
