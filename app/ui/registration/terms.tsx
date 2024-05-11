import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

export default function Terms() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className=" flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="text-md rounded-md bg-white px-1 py-2 font-medium text-blue-600 hover:text-green-400 focus:outline-none focus-visible:ring-white/75"
        >
          Terms and Conditions
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Terms and Conditions of Use
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      These terms and conditions ("Agreement") govern your use
                      of the CourtHUB web application and related services
                      (collectively referred to as the "Service"). By accessing
                      or using the Service, you agree to be bound by this
                      Agreement.
                    </p>
                  </div>
                  <Disclosure as="div" className="mt-2">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-green-500/10 px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                          <span>View Full Agreement</span>
                          <ChevronUpIcon
                            className={`${
                              open ? 'rotate-180 transform' : ''
                            } h-5 w-5 text-green-900`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                          <div>
                            <b>User Conduct</b>
                            <br></br>
                            You agree to use the Service only for lawful
                            purposes and in accordance with this Agreement. You
                            will not use the Service to engage in any activity
                            that could harm, disrupt, or interfere with the
                            operation of the Service or any other user's use of
                            the Service.<br></br>
                            <b>User Accounts</b>
                            <br></br>
                            In order to use certain features of the Service, you
                            may be required to create a user account. You are
                            responsible for maintaining the confidentiality of
                            your account information and for all activities that
                            occur under your account.<br></br>
                            <b>Profile Information</b>
                            <br></br>
                            By creating a profile on the Service, you agree to
                            provide accurate, current, and complete information
                            about yourself. You are solely responsible for the
                            content that you upload, post, or otherwise make
                            available on your profile.<br></br>
                            <b>Code of Conduct</b>
                            <br></br>
                            You agree to conduct yourself in a respectful and
                            sportsmanlike manner when interacting with other
                            users of the Service. You will not engage in any
                            harassing, abusive, or otherwise offensive behavior
                            towards other users.<br></br>
                            <b>Limitation of Liability</b>
                            <br></br>
                            The Service is provided on an "as is" and "as
                            available" basis. We make no warranties, express or
                            implied, regarding the reliability, accuracy, or
                            availability of the Service. In no event shall we be
                            liable for any indirect, incidental, special, or
                            consequential damages arising out of or in any way
                            connected with your use of the Service.<br></br>
                            <b>Indemnification</b>
                            <br></br>
                            You agree to indemnify and hold harmless [Your
                            Company Name], its affiliates, and their respective
                            officers, directors, employees, and agents from and
                            against any and all claims, liabilities, damages,
                            losses, or expenses arising out of or in any way
                            related to your use of the Service.<br></br>
                            <b>Governing Law</b>
                            <br></br>
                            This Agreement shall be governed by and construed in
                            accordance with the laws of [Your Jurisdiction],
                            without regard to its conflict of law principles.
                            <br></br>
                            <b>Changes to Terms</b>
                            <br></br>
                            We reserve the right to modify or update this
                            Agreement at any time. Any changes will be effective
                            immediately upon posting the revised Agreement on
                            the Service.<br></br>
                            <b>Contact Info</b>
                            <br></br>
                            If you have any questions or concerns about this
                            Agreement, please contact us at [Your Contact
                            Email]. By accessing or using the Service, you
                            acknowledge that you have read, understood, and
                            agree to be bound by this Agreement. Please note
                            that this is a generic example and may need to be
                            tailored to fit the specific features and
                            requirements of your web app, as well as the
                            relevant laws and regulations in your jurisdiction.
                            It's recommended to consult with a legal
                            professional to ensure that your terms and
                            conditions agreement provides adequate protection
                            for your web app and its users.
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
