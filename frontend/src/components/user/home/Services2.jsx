import React from "react";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

function Services2({ serviceGroup = [] }) {
  const navigate = useNavigate();

  const handleButtonClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceGroup.map((service, index) => (
            <div
              key={index}
              className={`py-10 pl-5 ${
                index % 3 === 0
                  ? "col-span-2 bg-gradient-to-br from-gray-500 to-white/90"
                  : index % 3 === 1
                  ? "bg-gradient-to-br from-green-500/90 to-green-600/70"
                  : "bg-gradient-to-br from-blue-400 to-blue-500/90"
              } text-white rounded-3xl relative h-[320px] flex items-end`}
            >
              <div>
                <div className="mb-4">
                  <p
                    className={`mb-[2px] font-semibold ${
                      index % 3 === 0 ? "text-gray-50" : "text-white"
                    }`}
                  >
                    {service.name}
                  </p>
                  <p className="text-2xl font-semibold mb-[2px]">
                    {service.category}
                  </p>
                  <Button
                    handler={() => handleButtonClick(service._id)}
                    text="Browse"
                    bgColor={index % 3 === 0 ? "bg-zinc-900" : "bg-white"}
                    textColor={
                      index % 3 === 0
                        ? "text-white"
                        : index % 3 === 1
                        ? "text-green-500"
                        : "text-blue-500"
                    }
                  />
                </div>
              </div>
              <img
                src={service.imageUrl}
                className={`w-[320px] absolute bottom-0 ${
                  index % 3 === 0
                    ? "top-1/2 -translate-y-1/2 -right-0"
                    : index % 3 === 1
                    ? ""
                    : "-right-4 lg:top-[40px]"
                }`}
                alt={service.type}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services2;
