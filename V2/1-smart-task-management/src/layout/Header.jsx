import React, { useState } from 'react'

const Header = () => {
    const[search , setSearch] = useState()
    return (
        <>
            <div>Header</div>
            <Header className='flex justify-end'>
                <input type="text" placeholder='Search tasks,members or projects' />
                <div className=''>
                    <button className=''>
                        <span class="material-symbols-outlined">
                            notifications_unread
                        </span>
                    </button>

                    <div className='flex'>
                        <div className=''>
                          <h4>Pithwi singh</h4>
                          <p>Team Leader</p>
                        </div>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVPJcDU1iatDHgwLoPB6JNTEzTa-qotNWTlUBVlwi7tsBQ1nXPc3LFUGP41qc9koxSex_S0Eu-kTryuZB7Jmp5b0dF_HAlne4tsLz2UALnqZHRnLzB4ozLftGA6FMqAzYgATSqm9HRtFInDdQ33xZhotqvd-yeKSaA3l1bLztv9T0bYwrdTTmwinEf-tanpPUg0VhsCWeeZkl2k3YewSfpSgTHUy8xDg0O4IgEJgbJSiO1ikAO-dt856ZQwofQyLFrwPWBYgbukHM" 
                        className='size-10 rounded-full bg-primary/10 border-2 border-primary/20 overflow-hidden bg-cover bg-center'
                        />

                    </div>
                </div>
            </Header>

        </>

    )
}

export default Header