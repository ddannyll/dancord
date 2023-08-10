import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginInputs = {
    username: string
    password: string
    confirmPassword: string
}

export default function Register() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputs>({reValidateMode: 'onChange'})
    const onSubmit: SubmitHandler<LoginInputs> = data => {
        router.push('/login')
    }
    const labelClasses = 'text-zinc-400 font-bold text-sm mt-2 flex'
    const inputClasses = 'bg-zinc-900 p-2 w-full rounded'

    const RequiredStar = () => (<div className="text-red-500 inline text-xs pl-1">*</div>)

    return (
        <div className="w-screen h-screen text-zinc-400 bg-zinc-700 flex justify-center items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="shadow-md max-w-md w-full flex flex-col gap-2 p-6 bg-zinc-800 rounded">
                <h1 className="text-zinc-50 text-xl font-medium text-center">Register To Dancord</h1>

                <label htmlFor="username" className={labelClasses}>
                    USERNAME
                    <RequiredStar />
                    {errors.username && <span className='text-red-500 font-normal grow text-end'>Username is required</span>}
                </label>
                <input id="username" type="text" className={inputClasses}
                    {...register('username', {required: true})}
                />

                <label htmlFor="password" className={labelClasses}>
                    PASSWORD
                    <RequiredStar />
                    {errors.password && <span className='text-red-500 font-normal grow text-end'>Password is required</span>}
                </label>
                <input id="password" type="password" className={inputClasses}
                    {...register('password', {required: true})}
                />

                <label htmlFor="confirmPassword" className={labelClasses}>
                    CONFIRM PASSWORD
                    <RequiredStar />
                    {errors.confirmPassword && <span className='text-red-500 font-normal grow text-end'>Passwords must match</span>}
                </label>
                <input id="confirmPassword" type="password" className={inputClasses}
                    {...register('confirmPassword', {
                        validate: (value, formValues) => value === formValues.password,
                    })}
                />

                <button
                    className="bg-violet-500 text-violet-50 p-2 rounded mt-5 hover:bg-violet-600 active:bg-violet-700 transition"
                >
                    Register
                </button>
                <p className="text-sm">Have an account? <Link href={'/login'} className="text-violet-400 hover:underline">Login</Link></p>
            </form>
        </div>
    )
}
