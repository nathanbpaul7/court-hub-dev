import { RadioGroup } from '@headlessui/react';
import { CourtTestIcon } from '../components';

const courts = [
  {
    name: 'East Poplar Playground Tennis Courts',
    address: '880 N 8th St, Philadelphia, PA 19123',
    courts: 3,
    value: 'poplar',
  },
  {
    name: 'Fairmount Park Tennis Courts',
    address: '3300 Ridge Ave, Philadelphia, PA 19132',
    courts: 10,
    value: 'fairmount',
  },
  {
    name: 'FDR Park Tennis Courts',
    address: '1500 Pattison Ave, Philadelphia, PA 19145',
    courts: 12,
    value: 'fdr',
  },
];

export default function HomeCourtSelect({
  setSelectedCourt,
  selectedCourt,
}: {
  setSelectedCourt: (value: string) => void;
  selectedCourt: string;
}) {
  return (
    <div className="h-full w-full max-w-md flex-grow">
      <RadioGroup
        className="flex-grow"
        value={selectedCourt}
        onChange={setSelectedCourt}
      >
        <RadioGroup.Label className="sr-only">
          Select Your Home Court
        </RadioGroup.Label>
        <div className="h-full flex-grow space-y-2">
          {courts.map((court) => (
            <RadioGroup.Option
              key={court.value}
              value={court.value}
              className={({ active, checked }) =>
                `${
                  active
                    ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-green-100'
                    : ''
                }
                  ${
                    checked
                      ? 'bg-green-logo text-white'
                      : ' border-green-logo border-0.5 bg-gray-50 '
                  }
                     relative flex flex-grow cursor-pointer rounded-lg px-5 py-2  focus:outline-none lg:py-[46px]`
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="flex w-full flex-grow items-center justify-between">
                    <div className="w-full max-w-md">
                      <div className="text-sm lg:text-base">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${
                            checked ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {court.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline-flex ${
                            checked
                              ? 'fill-green-100 text-green-100'
                              : 'fill-gray-500 text-gray-500'
                          }`}
                        >
                          <span>{court.address}</span>{' '}
                          <span className="hidden newcard:flex sm:items-center">
                            <span className="mx-2 " aria-hidden="true">
                              &middot;
                            </span>{' '}
                            <CourtTestIcon className="mr-1 h-4 w-4 rotate-90 transform" />
                            {court.courts}{' '}
                          </span>
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckIcon className="ml-1 h-6 w-6" />
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
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
