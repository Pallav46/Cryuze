// import React from "react";
import useGetServices from "../../hooks/useGetServices";

function Cards() {
  const { data: services, loading, error } = useGetServices();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 mt-10">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
          What are you looking for
        </h5>
        <ul className="my-4 space-y-3">
          {services.map((service) => (
            <li key={service._id}>
              <a
                href={`service/${service._id}`} // Interpolate service._id within {}
                className="hover:scale-[1.1] duration-200 rounded-lg flex items-center p-3 text-base font-bold text-white bg-black hover:bg-white group hover:shadow hover:text-black"
              >
                <svg
                  aria-hidden="true"
                  className="h-4"
                  viewBox="0 0 40 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Example SVG path, adjust if dynamic or static */}
                  <path
                    d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z"
                    fill="#E17726"
                  />
                  <path
                    d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z"
                    fill="#E27625"
                  />
                  {/* Other SVG paths */}
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  {service.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Cards;
