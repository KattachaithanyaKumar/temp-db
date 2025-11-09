const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-(--blue-dark) p-6 rounded-3xl border border-(--white-10) ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
