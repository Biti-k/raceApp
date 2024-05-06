import { useContext,useEffect,useState } from 'react'
import { ProductesContext } from '../context/ProductesContext'
import { Card } from '../components/Card'
import { CarroContext } from '../context/CarroContext'
import { Icon } from '@iconify/react'

export const ProductesScreen = () =>
{
	
	const { productes, isLoad } = useContext(ProductesContext)

	const {
        llistaCompres, 
        afegirCompra, 
        eliminarCompra, 
        aumentarQuantitat, 
        disminuirQuantitat
    } = useContext(CarroContext)


	const [selectedOption, setSelectedOption] = useState();
	const [options, setOptions] = useState([]);

	const [productesShow, setProductesShow] = useState([]);

	const handleAfegir = (prod)=>{
		
		productes.map((e)=>{
			if(e.id == prod.id){
				e.added = true
			}
			return e
		})

		afegirCompra(prod)
	}

	const handleEliminar = (prod)=>{
		productes.map((e)=>{
			if(e.id == prod.id){
				e.added = false
			}
			return e
		})

		eliminarCompra(prod.id)
	}

	

	useEffect(()=>{
		if(isLoad){

			//carrega dels productes
			setProductesShow(productes);

			//carrega del select
			let ops = [];
			productes.map((e, i, a)=>{
				if(!ops.includes(e.category)){
					ops.push(e.category);
				}
			});
			setOptions(ops);
		}
	}, [isLoad])
	

	const handleSelectChange = (evt) => {

		setSelectedOption(evt.target.value);
		if(evt.target.value != '-1'){
			setProductesShow(productes.filter((e)=>{return e.category == evt.target.value}));
		}else{
			setProductesShow(productes);
		}

	};

	return(
	<>
			<h2>Productes Screen</h2>
			
			{!isLoad ? 
				<div className="d-flex w-100 justify-content-center align-items-center ">
					<Icon className="loading" icon="line-md:loading-twotone-loop" />
				</div>
			:
				<div>
					<div className="d-flex">
						<select value={selectedOption} onChange={handleSelectChange} className="m-3 form-select w-auto bg-secondary text-white ">
							<option value="-1">Selecciona categoria</option>
							{	options.map((op, i) => 
									<option key={op} value={op}>{op}</option>
								)
							}
						</select>
					</div>
					<div className="container-fluid">
						<div className='row'>
							{	productesShow.map((p,i)=>
								<div key={i} className="col-12 col-md-6 col-lg-4 my-2">
									<Card 
										imatge={p.image}
										titol={p.title}
										descripcio={p.description}
										categria={p.category}
										preu={p.price}
										handleAfegir={()=>{ handleAfegir(p)}}
										handleEliminar={()=>{ handleEliminar(p)}}
										isAdded={p.added ? true : false}
									></Card>
								</div>
								)
							}
						</div>
					</div>
				</div>
			}
	</>
	)
}