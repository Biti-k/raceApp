import { Icon } from "@iconify/react/dist/iconify.js";
import { ButtonDelete } from "./ButtonDelete";
import { Button } from "./Button";
export const Card = ({cursa})=> {



    return (
        <>
            <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-mint bg-clip-border text-darkmetal shadow-md shadow-darkmetal">
                <div className="relative mx-4 mt-4 overflow-hidden shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border text-darkmetal shadow-blue-gray-500/40">
                    <img
                    src={cursa.cur_foto}
                    alt="cursa imatge"
                    />
                    <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
                    
                </div>
                </div>
                <div className="p-6" >
                    <div className="flex items-center justify-between mb-3">
                    <h5 className="block text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                        {cursa.cur_nom}
                    </h5>
                    <p className="flex items-center gap-1.5  text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                    <Icon icon="fluent:people-queue-20-filled" className="text-2xl text-blue1"/>
                        ?/{cursa.cur_limit_inscr}
                    </p>
                    </div>
                    <p className="block text-base antialiased font-light leading-relaxed text-gray-700">
                    {cursa.cur_desc}
                    </p>
                <div className="gap-1 p-6 pt-3 columns-2" id="botones">
                    <Button contenido={'Modificar'} icono={<Icon icon="material-symbols:edit-document-rounded" className="inline text-2xl align-middle text-blue2"/>}></Button>
                    <ButtonDelete></ButtonDelete>
                </div>
                </div>
            </div>
        </>
    );
}

export default Card;
