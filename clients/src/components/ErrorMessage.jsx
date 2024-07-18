const ErrorMessage = ({ error }) => {
  console.log(error);
  return (
    <section className="max-w-7xl h-height-dvh mx-auto  py-12 px-4 md:px-8 lg:px-12 lg:py-16">
      <div>
        <h3 className="text-2xl font-medium  md:text-3xl mb-4">
          Something went Wrong
        </h3>
        <p className="text-xs md:text-sm max-w-xs sm:max-w-md leading-7 md:max-w-xl md:leading-6  ">
          {error}
        </p>
      </div>
    </section>
  );
};

export default ErrorMessage;
