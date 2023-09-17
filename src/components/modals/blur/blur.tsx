const Blur = ({
  setVisibility,
  visibility,
}: {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  visibility: boolean;
}) => {
  return (
    <div
      className={`fixed h-full w-full bg-slate-900 transition-all duration-500 ${
        visibility ? "opacity-70 duration-500" : "opacity-0 hidden"
      }`}
      onClick={() => setVisibility(false)}
    ></div>
  );
};

export default Blur;
