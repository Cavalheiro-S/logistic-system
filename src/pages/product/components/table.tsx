type TableProps = {
    products: Product[]
}

export const ProductTable = ({ products }: TableProps) => {

    const renderRow = (product: Product) => {
        return (
            <tr key={product.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{product.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <div className="text-sm leading-5 text-gray-900">{product.type}</div>
                </td>
            </tr>
        )
    }

    return (
        <div className="py-2 pr-10 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block w-full px-12 py-4 overflow-hidden align-middle bg-white rounded-tl-lg rounded-tr-lg shadow-lg">
                <div className="flex justify-between">
                    <div className="inline-flex w-7/12 h-12 px-2 bg-transparent border rounded lg:px-6">
                        <div className="relative flex flex-wrap items-stretch w-full h-full mb-6">
                            <div className="flex">
                                <span className="flex items-center py-2 text-sm leading-normal whitespace-no-wrap bg-transparent border border-r-0 border-none rounded rounded-r-none lg:px-3 text-grey-dark">
                                    <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                            </div>
                            <input type="text" className="relative flex-1 flex-grow flex-shrink w-px px-3 font-thin leading-normal tracking-wide text-gray-500 border border-l-0 border-none rounded rounded-l-none focus:outline-none text-xxs lg:text-base" placeholder="Procurar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="inline-block min-w-full px-8 pt-3 overflow-hidden align-middle bg-white rounded-bl-lg rounded-br-lg shadow shadow-dashboard">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 leading-4 tracking-wider text-left text-gray-500 border-b-2 border-gray-300">ID</th>
                            <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-gray-500 border-b-2 border-gray-300">Nome</th>
                            <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-gray-500 border-b-2 border-gray-300">Descrição</th>
                            <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-gray-500 border-b-2 border-gray-300">Preço</th>
                            <th className="px-6 py-3 text-sm leading-4 tracking-wider text-left text-gray-500 border-b-2 border-gray-300">Tipo</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {products.map(renderRow)}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="py-4 mt-4 sm:flex-1 sm:flex sm:items-center sm:justify-end work-sans">
                    <div className="flex justify-end">
                        <nav className="relative z-0 inline-flex shadow-sm">
                            <div	>
                                <a href="#" className="relative inline-flex items-center px-2 py-2 text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-l-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500" aria-label="Previous">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                            <div>
                                <a href="#" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary">
                                    1
                                </a>
                                <a href="#" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary">
                                    2
                                </a>
                                <a href="#" className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-600 transition duration-150 ease-in-out bg-white border border-gray-300 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 hover:bg-tertiary">
                                    3
                                </a>
                            </div>
                            <div v-if="pagination.current_page < pagination.last_page">
                                <a href="#" className="relative inline-flex items-center px-2 py-2 -ml-px text-sm font-medium leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-r-md hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500" aria-label="Next">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}