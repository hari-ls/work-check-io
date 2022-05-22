function Error(props) {
  const message = "Opps! there's an error...";

  return (
    <div className="container max-auto p-12 text center">
      <h1>{message}</h1>
    </div>
  );
}

export default Error;
