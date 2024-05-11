import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CourtIcon } from '../../components';

const courtOptions = [
  {
    name: 'East Poplar Playground ',
    address: '880 N 8th St, Philadelphia, PA 19123',
    courts: 3,
    value: 'poplar',
  },
  {
    name: 'Fairmount Park (Strawberry Mansion) ',
    address: '3300 Ridge Ave, Philadelphia, PA 19132',
    courts: 10,
    value: 'fairmount',
  },
  {
    name: 'FDR Park ',
    address: '1500 Pattison Ave, Philadelphia, PA 19145',
    courts: 12,
    value: 'fdr',
  },
  {
    name: 'All Courts',
    address: 'Poplar, Fairmount, FDR',
  },
];

export default function CourtSelect() {
  const [selected, setSelected] = useState(courtOptions[0]);

  return (
    <div className="mb-4 w-full pr-4 lg:mb-2 ">
      <div className=" w-full max-w-sm">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Courts to Search
          </RadioGroup.Label>
          <div className="space-y-2">
            {courtOptions.map((options) => (
              <RadioGroup.Option
                key={options.option}
                value={options}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-green-100'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-green-logo text-white'
                      : ' border-green-logo border-0.5 '
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-2  focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {options.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`text inline ${
                              checked ? 'text-white' : 'text-gray-500'
                            }`}
                          >
                            <span>{options.address}</span>{' '}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="pl-4 text-white">
                          <CheckIcon className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
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
