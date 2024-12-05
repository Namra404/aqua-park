import {Page} from "~/shared/ui/page";

import logo from '../../../public/avatar.png'
import { SlidesAndServices} from "~/shared/mock/constants/constants";
import {ProfileOrdersTotal} from "~/widgets/(profile)/profile-orders";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/shared/ui/tabs";
import {ProfileTickets} from "~/widgets/(profile)/profile-tickets/ui/profile-tickets";
import {Text} from "~/shared/ui/text";


export default function Profile() {

    return (
        <Page className={'max-w-[1200px]'}>
            <div className={'flex justify-center'}>
                    <Tabs defaultValue="history" className="flex justify-center">
                        <TabsList className={'relative w-[200] bg-[#191A38] flex flex-col h-full justify-start items-stretch mr-10'} >
                            <TabsTrigger value="history">История заказов</TabsTrigger>
                            <TabsTrigger value="tickets">Отзывы</TabsTrigger>
                            <div className={'absolute flex justify-between items-center bottom-2'}>
                                <img className={'bg-white rounded-full'} src={Object.values(logo)[0]} alt={'not found'} width={40}/>
                                <Text className={'text-lg ml-5'} white>Арман Рубенович</Text>
                            </div>
                        </TabsList>
                        <TabsContent value="history"><ProfileOrdersTotal slidesAndService={SlidesAndServices}/></TabsContent>
                        <TabsContent value="tickets"><ProfileTickets/></TabsContent>
                    </Tabs>
            </div>
        </Page>
    )
}