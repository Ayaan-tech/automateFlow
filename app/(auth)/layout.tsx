import React  from "react"
const Layout = ({children}: {childern : React.ReactNode}) =>{
    return(
        <div className='bg-muted flex min-h-svh flex-col justify-center items-center  gap-6 p-6 md:p-10'>
        <div className='flex w-full max-w-sm flex-col gap-6'>
          <Link href={"/"} className='flex items-center gap-2'>
          <Image src={"/logo-bg.svg"} alt='Automate Flow' width={30} height={30}/>
          Automate Flow
          <Login/>
          </Link>
          {children}
        </div>
    </div>
    )
}