import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="flex justify-between p-5 items-center w-full">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Brain <span className=" text-blue-600">Bounce</span> </h1>
        </Link>



      </div>
    </nav>
  )
}

export default Navbar