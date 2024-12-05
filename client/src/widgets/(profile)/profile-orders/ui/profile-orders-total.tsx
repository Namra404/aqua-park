import {ProfileAllSlideProps} from "~/entities/profile-order/model/types";
import {ProfileOrder} from "~/entities/profile-order/ui/profile-order";


export const ProfileOrdersTotal = (props: ProfileAllSlideProps) => {
    return (
        <div className={'w-[900px] min-h-[400px] shadow-2xl rounded-xl p-4 grid grid-cols-3'}>
            {props.slidesAndService.map((item, index) => (
                <ProfileOrder key={index} slide={item.slide} services={item.services} total_price={item.total_price}/>
            ))}
        </div>
    )
}