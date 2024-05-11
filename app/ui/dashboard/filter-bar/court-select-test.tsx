export default function CourtSelectCheck({
  selectedOptions,
  setSelectedOptions,
  courtOptions,
}) {
  // Handler function to handle checkbox change
  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      // Remove the option if it's already selected
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // Add the option if it's not selected
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="mb-4 w-full pr-4 lg:mb-2 ">
      <div className=" w-full max-w-sm">
        <div>
          <div className="sr-only">Courts to Search</div>
          <div className="space-y-2">
            {courtOptions.map((options) => (
              <div
                key={options.option}
                className={`${
                  selectedOptions.includes(options.option)
                    ? 'bg-blue-600 text-white'
                    : 'border-0.5 border-blue-600 bg-gray-50'
                } relative flex cursor-pointer rounded-lg px-5 py-2 focus:outline-none`}
                onClick={() => handleCheckboxChange(options.option)}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  id={options.option}
                  name="courts"
                  value={options.option}
                  checked={selectedOptions.includes(options.option)}
                  onChange={() => handleCheckboxChange(options.option)}
                />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <p
                        className={`font-medium ${
                          selectedOptions.includes(options.option)
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}
                      >
                        {options.option}
                      </p>
                      <span
                        className={`text inline ${
                          selectedOptions.includes(options.option)
                            ? 'text-white'
                            : 'text-gray-500'
                        }`}
                      >
                        <span>{options.courts}</span>{' '}
                        <span aria-hidden="true">&middot;</span>{' '}
                        <span>{options.players}</span>
                      </span>
                    </div>
                  </div>
                  {selectedOptions.includes(options.option) && (
                    <div className="pl-4 text-white">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
