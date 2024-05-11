import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

const levelOptions = [
  {
    level: 'Beginner',
    range: 'includes beginner-intermediate',
    tourn: '3.0 - 3.5',
  },
  {
    level: 'Intermediate',
    range: 'includes intermediate-advanced',
    tourn: '3.5 - 4.0',
  },
  {
    level: 'Advanced',
    range: 'includes beginner-intermediate',
    tourn: '4.0 - 4.5+',
  },
];

export default function LevelSelect() {
  const [selected, setSelected] = useState(levelOptions[0]);

  return (
    <div className="mb-4 w-full pr-4 lg:mb-2 ">
      <div className=" w-full max-w-sm">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">
            Courts to Search
          </RadioGroup.Label>
          <div className="space-y-2">
            {levelOptions.map((level) => (
              <RadioGroup.Option
                key={level.level}
                value={level}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-green-100'
                      : ''
                  }
                  ${
                    checked
                      ? 'bg-blue-600 text-white'
                      : ' border-0.5 border-blue-600 bg-gray-50 '
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
                            {level.level}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`text inline ${
                              checked ? 'text-white' : 'text-gray-500'
                            }`}
                          >
                            <span>{level.range}</span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{level.tourn}</span>
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
