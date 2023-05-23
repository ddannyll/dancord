import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginInputs = {
    email: string
    password: string
}

export default function LoginForm() {
    const { register, handleSubmit, formState: {errors} } = useForm<LoginInputs>()
    const onSubmit: SubmitHandler<LoginInputs> = data => {
        console.log(data)
    }
    const labelClasses = 'text-zinc-400 font-bold text-sm mt-2 flex'
    const inputClasses = 'bg-zinc-900 p-2 w-full rounded'

    const RequiredStar = () => (<div className="text-red-500 inline text-xs pl-1">*</div>)

    return (
        <div className="w-screen h-screen text-zinc-400 bg-zinc-700 flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md max-w-md w-full flex flex-col gap-2 p-6 bg-zinc-800 rounded">
                <h1 className="text-zinc-50 text-xl font-medium text-center">Login To Dancord</h1>

                <label htmlFor="email" className={labelClasses}>
                    EMAIL<RequiredStar /> {errors.email && <span className='text-red-500 font-normal grow text-end'>Email is required</span>}
                </label>
                <input id="email" type="text" className={inputClasses} {...register('email', {required: true})}/>

                <label htmlFor="password" className={labelClasses}>
                    PASSWORD<RequiredStar /> {errors.password && <span className='text-red-500 font-normal grow text-end'>Password is required</span>}
                </label>
                <input id="password" type="text" className={inputClasses} {...register('password', {required: true})}/>

                <button className="bg-violet-500 text-violet-50 p-2 rounded mt-5 hover:bg-violet-600 active:bg-violet-700 transition">Log In</button>
                <p className="text-sm">Need an account? <Link href={'/register'} className="text-violet-400 hover:underline">Register</Link></p>
            </form>
        </div>
    )
}
