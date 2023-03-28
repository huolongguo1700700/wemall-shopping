/**
 * @Description Error Component
 * @author GYX xiao sb
 * @date 27.03.2023
*/
import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()
    console.error(error)
    
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <div className="h-2/5">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    )
}