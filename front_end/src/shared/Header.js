import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import image from '../assets/logo2.png'
import logo from '../assets/logo.png'
import profile from '../assets/Profile_Photo.png'
import '../pages/style/Header.css'
import { useNavigate, Link } from 'react-router-dom'
import { removeAuthUser, getAuthUser } from '../helper/Storage'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {

  const Navigate = useNavigate();
  const Auth = getAuthUser();

  const Logout = () => {
    removeAuthUser();
    Navigate("/login");
  }

  return (
   
<Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img
                    className="h-11 w-auto cursor-pointer"
                    src={logo}
                    alt="Our Logo"
                  />
                  </Link>
                </div>
                <div className="hidden sm:ml-16 sm:block MainContent">
                  <div className="flex justify-center space-x-4">

                    {Auth && Auth.role !== "ADMIN" && (
                      <>
                    <Link to={"/"} key={'Home'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Home</Link>
                    <Link to={"/lessons"} key={'Lessons'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Lessons</Link>
                    <Link to={"/quizzes"} key={'Quizzes'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Quizzes</Link>
                    <Link to={"/contact"} key={'Contact'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Contact</Link>
                      </>)}
                      
                    {Auth && Auth.role === "ADMIN" && (
                      <>
                          <Link to={"/"} key={'Home'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Home</Link>
                          <Link to={"/teacher"} key={'Teacher'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Teacher</Link>
                          <Link to={"/student"} key={'Student'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Student</Link>
                          <Link to={"/parent"} key={'Parent'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Parent</Link>
                          <Link to={"/registration"} key={'Register'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Register</Link>
                      </>
                    )}
                    
                    {!Auth && <Link to={"/login"} key={'Login'} className="StyleCurrent rounded-md px-3 py-2 text-lg font-black">Login</Link>}

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                 

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  
                    {/* Signout button for admin */}

                
                
                    {Auth && Auth.role ==="ADMIN" && <Menu.Item>
                        
                          <Link
                            to={"#"}
                            
                        onClick={Logout} 
                      >
                        <buton id="logoutAdminButton">
                            Sign out
                        </buton> 
                          </Link>
                        
                      </Menu.Item>}

               

                  {Auth && Auth.role !== "ADMIN" && <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
                        alt="Profile Photo"
                      />
                    </Menu.Button>
                  </div>}
                 {Auth && Auth.role !== "ADMIN" && <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/account"}
                            className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"/reports"}
                            className={classNames(active ? 'bg-gray-300' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Reports
                          </Link>
                        )}
                      </Menu.Item>
                      {Auth && Auth.role !== "ADMIN" && <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={"#"}
                            className={classNames(active ? 'bg-red-500 text-white' : '', 'block px-4 py-2 text-base font-medium text-red-700')}
                            onClick={Logout}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>}
                      
                    </Menu.Items>
                  </Transition> }

                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2"> 
              {Auth && Auth.role !== "ADMIN" && (
                <>
                  <Disclosure.Button key={'Home'}  as="a"  href={"/"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Home
                </Disclosure.Button>
                <Disclosure.Button key={'Lessons'}  as="a"  href={"/lessons"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Lessons
                </Disclosure.Button>
                <Disclosure.Button key={'Quizzes'}  as="a"  href={"/quizzes"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Quizzes
                </Disclosure.Button>
                <Disclosure.Button key={'Contact'}  as="a"  href={"/contact"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Contact
                </Disclosure.Button>
                </>   
              )
              }
              {Auth && Auth.role === "ADMIN" && (
                <>
                    <Disclosure.Button key={'Home'}  as="a"  href={"/"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Home
                  </Disclosure.Button>
                  <Disclosure.Button key={'Teacher'}  as="a"  href={"/teacher"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Teacher
                  </Disclosure.Button>
                  <Disclosure.Button key={'Student'}  as="a"  href={"/student"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Student
                  </Disclosure.Button>
                  <Disclosure.Button key={'Parent'}  as="a"  href={"/parent"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Parent
                  </Disclosure.Button>
                  <Disclosure.Button key={'Register'}  as="a"  href={"/registration"}  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                  Register
                </Disclosure.Button>
                </>
              )

              }
                
              {!Auth && <Disclosure.Button key={'Login'} as="a" href={"/login"} className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
                Login
              </Disclosure.Button>}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
   
  )
}

export default Header