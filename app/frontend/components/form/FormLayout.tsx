interface FormLayoutProps {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

export const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="min-h-[80vh]">
      <div className="w-[90%] md:w-[80%] pt-12 mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold mb-[30px]">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};
