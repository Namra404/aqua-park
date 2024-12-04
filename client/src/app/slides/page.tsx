import {Page} from "~/shared/ui/page";
import {slidersEnum} from "~/shared/mock/constants/constants";
import {SlideCard} from "~/entities/popular-rollers/ui/popular-slide-card";


export default function Slides()  {
    return (
        <Page>
            <div className={'grid grid-cols-3 gap-4'}>
                {
                    slidersEnum.map((item, index) => (
                        <SlideCard name={item.name} key={index}/>
                    ))
                }
            </div>
        </Page>
    )
}