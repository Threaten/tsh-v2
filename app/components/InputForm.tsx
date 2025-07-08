import React, { useState } from "react";

const InputForm = () => {
  const [date, setDate] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = new Date(e.target.value);
    if (!isNaN(inputDate.getTime())) {
      const day = inputDate.getDate().toString().padStart(2, "0");
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const year = inputDate.getFullYear();
      setDate(`${day}/${month}/${year}`);
    }
  };

  return (
    <div className="w-[400px] space-y-2">
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block text-amber-800 text-sm font-medium"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          className="w-full px-4 py-2 bg-transparent border border-amber-300/50 rounded-lg text-amber-800 focus:outline-none focus:border-amber-500"
          placeholder="Enter your full name"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="dob"
          className="block text-amber-800 text-sm font-medium"
        >
          Date of Birth
        </label>
        <div className="relative">
          <input
            type="date"
            id="dob"
            onChange={handleDateChange}
            className="w-full px-4 py-2 bg-transparent border border-amber-300/50 rounded-lg text-amber-800 focus:outline-none focus:border-amber-500 [color-scheme:light]"
          />
          {date && (
            <div className="absolute inset-0 flex items-center px-4 pointer-events-none text-amber-800">
              {date}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputForm;
