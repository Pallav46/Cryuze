import Services from "../../../../components/user/home/Services";
import Services2 from "../../../../components/user/home/Services2";
import useGetServices from "../../../../hooks/useGetServices";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Service = () => {
  const { data: services, loading, error } = useGetServices();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Check if services is defined and not empty
  if (!services || services.length === 0) {
    return <div>No services available</div>;
  }

  // Split services into chunks of three
  const serviceChunks = chunkArray(services, 3);

  return (
    <div>
      {serviceChunks.map((serviceGroup, index) => {
        // Alternate between Services and Services2
        if (index % 2 === 0) {
          return <Services key={index} serviceGroup={serviceGroup} />;
        } else {
          return <Services2 key={index} serviceGroup={serviceGroup} />;
        }
      })}
    </div>
  );
}

export default Service;
