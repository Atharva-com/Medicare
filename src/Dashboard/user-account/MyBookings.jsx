import UseFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../utils/config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import DoctorCard from '../../components/Doctors/DoctorCard'

const MyBookings = () => {

    const { data: appointments, loading, error } = UseFetchData(`${BASE_URL}/users/appointments/my-appointments`)
    return (
        <div>
            {loading && !error && <Loading />}

            {error && !loading && <Error errMessage={error} />}

            {!loading && !error && <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {
                    appointments.map(doctor => {
                        return (
                            <DoctorCard doctor={doctor} key={doctor._id} />
                        )
                    })
                }
            </div>
            }

            {!loading && !error && appointments.length === 0 && <h3 className='mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor'>
                You did not book any appointment yet.
            </h3>
            }
        </div>
    )
}

export default MyBookings