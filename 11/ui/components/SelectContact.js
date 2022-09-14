import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export const SelectContact = ({ title, contact, setContact, contacts }) => (
  <Listbox value={contact} onChange={setContact}>
    {({ open }) => (
      <>
        <Listbox.Label className="block text-sm font-medium text-gray-700">
          {title}
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
            <span className="flex items-center">
              {contact?.imageUrl && (
                <img
                  src={contact.imageUrl}
                  alt=""
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
              )}
              <span className="ml-3 block truncate">
                {contact?.name || 'Select a contact'}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-32 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {!contacts.length && (
                <Listbox.Option
                  className={classNames(
                    'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                  )}
                  disabled
                  value={null}
                >
                  <div className="flex items-center">
                    <span
                      className={classNames(
                        'font-normal',
                        'ml-3 block truncate'
                      )}
                    >
                      No contacts found
                    </span>
                  </div>
                </Listbox.Option>
              )}

              {contacts.map((c) => (
                <Listbox.Option
                  key={c._id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={c}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        {c.imageUrl && (
                          <img
                            src={c.imageUrl}
                            alt=""
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                        )}
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate'
                          )}
                        >
                          {c.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
);
