export default function Footer(){

    return(
            <footer className="bg-dark mt-5 py-5">
                <div className="footerContainer">
                    <div className="footerContainer-links">
                    <div className="footerContainer-links-wrapper">
                        <div className="footerContainer-links-wrapper-item">
                            <h2>Sobre Nosotros</h2>
                            <a href="/sign__up">Cómo funciona</a>
                            <a href="/">Testimonios</a>
                            <a href="/">Carreras</a>
                            <a href="/">Términos del servicio</a>
                        </div>  
                        <div className="footerContainer-links-wrapper-item">
                            <h2>Contáctanos</h2>
                            <a href="/">Contacto</a>
                            <a href="/">Soporte</a>
                            <a href="/">Destinos</a>
                        </div>
                        </div>
                    <div className="footerContainer-links-wrapper">
                        <div className="footerContainer-links-wrapper-item">
                            <h2>Videos</h2>
                            <a href="/">Enviar video</a>
                            <a href="/">Embajadores</a>
                            <a href="/">Agencia</a>
                        </div>
                        
                        <div className="footerContainer-links-wrapper-item">
                            <h2>Redes Sociales</h2>
                            <a href="/">Instagram</a>
                            <a href="/">Facebook</a>
                            <a href="/">YouTube</a>
                            <a href="/">Twitter</a>
                        </div>              
                    </div>
                    </div>
                    <section className="socialMedia">
                    <div className="socialMedia-wrap">
                        <div className="socialMedia-wrap-logo">
                        <a href="/" id="footer__logo">Guitar Shop</a>
                        </div>
                        <p className="socialMedia-wrap-rights">© Guitar Shop 2025. All rights reserved</p>
                        <div className="socialIcons">
                        <a href="/" className="icon-facebook" target="_blank"><img src="img/facebook.png"></img></a>
                        <a href="/" className="icon-instagram" target="_blank"><img src="img/instagram.png"></img></a>
                        <a href="/" className="icon-youtube" target="_blank"><img src="img/youtube.png"></img></a>
                        <a href="/" className="icon-linkedin" target="_blank"><img src="img/linkedin.png"></img></a>
                        <a href="/" className="icon-tiktok" target="_blank"><img src="img/tik-tok.png"></img></a>
                        <a href="/" className="icon-whatsapp" target="_blank"><img src="img/whatsapp.png"></img></a>
                        </div>
                    </div>
                    </section>
                </div>

            </footer>
    )
}
