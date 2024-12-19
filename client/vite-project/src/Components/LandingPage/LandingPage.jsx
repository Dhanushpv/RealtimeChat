'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import WhisperWaveLogo from '../../Images/WhisperWaveLogo.png';
import { ChatBubbleLeftRightIcon, ShieldCheckIcon, PhotoIcon, UsersIcon } from '@heroicons/react/24/outline'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import WhisperWaveloginscreenshot from '../../Images/WhisperWaveloginscreenshot.png';

const navigation = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
]

const features = [
  {
    name: 'Real-time Messaging',
    description:
      'Experience seamless, instant communication with real-time messaging. WhisperWave keeps conversations flowing without delays.',
    icon: ChatBubbleLeftRightIcon, // Replace with the relevant icon for messaging
  },
  {
    name: 'End-to-End Encryption',
    description:
      'Your privacy matters. All messages on WhisperWave are protected with robust end-to-end encryption to ensure your conversations stay secure.',
    icon: ShieldCheckIcon, // Replace with the relevant icon for security
  },
  {
    name: 'Media Sharing',
    description:
      'Easily share images, videos, and files with your contacts. WhisperWave ensures quick and reliable transfers for all your media needs.',
    icon: PhotoIcon, // Replace with the relevant icon for media sharing
  },
  {
    name: 'Group Chats',
    description:
      'Stay connected with your friends, family, or colleagues. Create group chats to collaborate or simply catch up with multiple people at once.',
    icon: UsersIcon, // Replace with the relevant icon for groups
  },
];

const links = [
  { name: 'Download the app', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Privacy Policy', href: '#' },
  { name: 'Contact Support', href: '#' },
]

const stats = [
  { name: 'Active users', value: '500,000+' },
  { name: 'Messages sent daily', value: '10 million+' },
  { name: 'Groups created', value: '50,000+' },
  { name: 'Media shared', value: '1 million+ images/videos' },
]

const people = [
  {
    name: 'Dhanush Venkitesh',
    role: 'Founder / CEO',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },

  {
    name: 'Ayesha Khan',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Product Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Ravi Patel',
    role: 'Marketing Director',
    imageUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
  },
]

// const features = [
//   {
//     name: 'Push to deploy',
//     description:
//       'Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.',
    
//   },
//   {
//     name: 'SSL certificates',
//     description:
//       'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
//     icon: LockClosedIcon,
//   },
//   {
//     name: 'Simple queues',
//     description:
//       'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
//     icon: ArrowPathIcon,
//   },
//   {
//     name: 'Advanced security',
//     description:
//       'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
//     icon: FingerPrintIcon,
//   },
// ]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={WhisperWaveLogo}
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/LoginPage" className="text-sm/6 font-semibold text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center item-center">
            <div className="relative text-center sm:flex sm:justify-center   py-1 text-sm/6 text-gray-600 ">
            <img
                alt=""
                src={WhisperWaveLogo}
                className="h-full w-4/5"
              />
              
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl LoginLogo">
            Whisper Wave
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Stay connected privately and securely with WhisperWave, chatting effortlessly with loved ones through a seamless browser experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/LoginPage"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Chat faster and stay connected instantly.</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
          Everything you need to connect and communicate in real-time
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
          Whoever seeks to embrace growth and connection can find it here. Stay connected effortlessly with features designed for smooth communication and real-time engagement through WhisperWave.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    {/* <Bento Grids> */}


            {/* after the image screen shourt */}


     {/* <Bento Grids> */}

     <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Join us to chat faster and stay connected!</h2>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
          An animal was greatly affected by the incident, with no desire to avoid it. Those who took part in the event experienced significant consequences. Enjoy quick communication and stay instantly connected.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>

    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              {/* <p className="text-base/7 font-semibold text-indigo-600">Deploy faster</p> */}
              <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Faster communication, smoother connections.
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
              Seamless communication, effortless connections. Chat instantly, wherever you are
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt=""
            src={WhisperWaveloginscreenshot}
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>
              Connect instantly, chat effortlessly. With WhisperWave, enjoy seamless, real-time conversations without interruptions. Share messages, images, and files securely, anytime, anywhere. Stay engaged with fast, reliable, and secure communication for all your needs.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                    <span>
                      <strong className="font-semibold text-gray-900">Instant Messaging.</strong> Communicate in real-time without delays. WhisperWave keeps conversations flowing smoothly, anytime and anywhere.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                    <span>
                      <strong className="font-semibold text-gray-900">End-to-End Encryption.</strong> Your privacy is our priority. All messages are protected by robust encryption to ensure your conversations stay secure.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <ServerIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                    <span>
                      <strong className="font-semibold text-gray-900">Cloud Storage.</strong> Share and store images, videos, and files with ease. WhisperWave ensures your media is safely stored and easily accessible.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Stay connected with friends, family, and colleagues through fast and secure messaging. With WhisperWave, enjoy seamless communication with no interruptions, wherever you go.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No server? No problem.</h2>
                <p className="mt-6">
                  WhisperWave operates flawlessly without the need for complex server setups. Enjoy fast, secure, and real-time communication across devices, with effortless message synchronization and cloud-based reliability.
                </p>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the
            best results for our clients.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img alt="" src={person.imageUrl} className="size-16 rounded-full" />
                <div>
                  <h3 className="text-base/7 font-semibold tracking-tight text-gray-900">{person.name}</h3>
                  <p className="text-sm/6 font-semibold text-indigo-600">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-gray-900">
          Trusted by the world’s most innovative teams
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          <img
            alt="Transistor"
            src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Reform"
            src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="Tuple"
            src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          />
          <img
            alt="SavvyCal"
            src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          />
          <img
            alt="Statamic"
            src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
            width={158}
            height={48}
            className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          />
        </div>
      </div>
    </div>

    <footer className="bg-gray-900 text-gray-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <div className="md:col-span-2">
                                <img src={WhisperWaveLogo} alt="Company Logo" className="mb-4 w-24" />
                                <p className="mb-4">Whisper Wave</p>
                                <div className="flex space-x-4">
                                  <a href="#" className="text-gray-400 hover:text-gray-300">
                                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                                  </a>
                                  <a href="#" className="text-gray-400 hover:text-gray-300">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                  </a>
                                  <a href="#" className="text-gray-400 hover:text-gray-300">
                                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                                  </a>
                                  <a href="#" className="text-gray-400 hover:text-gray-300">
                                    <FontAwesomeIcon icon={faGithub} size="lg" />
                                  </a>
                                  <a href="#" className="text-gray-400 hover:text-gray-300">
                                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                                  </a>
                                </div>
                            </div>
                            {/* <div>
                                <h3 className="text-white font-semibold mb-4">Solutions</h3>
                                <ul>
                                    <li className="mb-2"><a href="#" className="hover:underline">Marketing</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Analytics</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Automation</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Commerce</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Insights</a></li>
                                </ul>
                            </div> */}
                            <div>
                                <h3 className="text-white font-semibold mb-4">Support</h3>
                                <ul>
                                    <li className="mb-2"><a href="#" className="hover:underline">Submit ticket</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Documentation</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Guides</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Company</h3>
                                <ul>
                                    <li className="mb-2"><a href="#" className="hover:underline">About</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Blog</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Jobs</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Press</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Legal</h3>
                                <ul>
                                    <li className="mb-2"><a href="#" className="hover:underline">Terms of service</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">Privacy policy</a></li>
                                    <li className="mb-2"><a href="#" className="hover:underline">License</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                            <p>© 2024 Your Company, Inc. All rights reserved.</p>
                        </div>
                    </div>
                </footer>


    </div>
    

    
  )
}
