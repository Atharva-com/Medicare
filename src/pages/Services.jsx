import { services } from "../assets/data/services"
import ServiceCard from "../components/Services/ServiceCard"

const Services = () => {
  return (
    <div className="container">
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mb-12 lg:mb-20 mt-10'>
        {services.map((item, index) => {
            return(
                <ServiceCard item={item} index={index} key={index} />
            )
        })}
    </div>
    </div>
  )
}

export default Services