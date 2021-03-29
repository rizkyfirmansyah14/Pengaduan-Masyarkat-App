import { useEffect, useState } from 'react';
import MySwal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function DashboardScreen(props) {
  const url_api = `https://dev.farizdotid.com/api/daerahindonesia`
  const URL_API = `http://localhost:8000`
  const [loading, setLoading] = useState(false)
  const [datakota, setDataKota] = useState('')
  const [kotapilih, setKotapilih] = useState('')
  const [idProvinsi, setIdProvinsi] = useState(1)
  const [kategori, setKategori] = useState('')
  const Swal = withReactContent(MySwal)
  if (!localStorage.getItem('token')) {
    window.location.href = '/'
}

  const fetchKota = async () => {
    try {
        const fetchApiStudents = await fetch(`${url_api}/provinsi`, {
            method: 'GET',
        })
        const resp = await fetchApiStudents.json()
        setDataKota(resp.provinsi)
        console.log(resp)
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

    const fetchKategori = async () => {
      try {
          const fetchApiCategory = await fetch(`${URL_API}/category`, {
              method: 'GET',
          })
          const resp = await fetchApiCategory.json()
          setKategori(resp.result)
          console.log(resp)
      } catch (error) {
          console.log(error)
          alert(error)
      }
    }

    const getKota = async () => {
      try {
          const fetchApikota = await fetch(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`, {
              method: 'GET',
          })
          const resp = await fetchApikota.json()
          setKotapilih(resp.kota_kabupaten)
          console.log(resp)
      } catch (error) {
          console.log(error)
          alert(error)
      }
    }

    useEffect(() => {
      fetchKategori()
        .then(() => {
          setLoading(true)
        })
    },[]) 

    useEffect(() => {
        fetchKota()
            .then(() => {
                setLoading(true)
            })
            .then(() => {
                fetchKota()
            })
            .then(() => {
                getKota()
            })

            if (idProvinsi) {
              getKota()
          }
    }, [idProvinsi])

    const logout = async () => {
      try {
          const getLogout = await fetch(`http://localhost:8000/logout-user`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }
          })
          const logout = await getLogout.json()
  
          console.log(logout)
          if (logout.success) {
              Swal.fire({
                  title: 'currently logged out of account...',
                  timer: 1000,
                  didOpen: () => {
                      Swal.showLoading()
                  },
              })
              localStorage.removeItem('nama')
              localStorage.removeItem('token')
              window.location.href = '/'
              props.history.push('/')
          }
      } catch (error) {
          console.log(error)
      }
    }


  // Handle Add data pengaduan
  const handleSubmit = async e => {
    e.preventDefault();
    let formData = new FormData(e.target)
    try {
        const fetchApi = await fetch(`${URL_API}/complaint/store`, {
            method: 'POST',
            body: formData
        })
        const create = await fetchApi.json()
        console.log(create)
        if (create.success) {
            Swal.fire({
                icon: 'success',
                title: 'Succes Add Data complaint',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).then(function () {
                window.location.href = '/'
                window.$('#addModal').modal('hide')
                Swal.fire({
                    title: 'Loading...',
                    timer: 1000,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                })
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'There is an error!',
            html:
                '<ul> ' +
                '<li><p style="color: red;">there are columns that have not been filled</p></li> ' +
                '</ul > '
        })
        console.log(error)
    }
  }
    return(
        <>
         <header id="header-section">
                <nav className="navbar navbar-expand-lg pl-3 pl-sm-0" id="navbar">
                <div className="container">
                    <div className="navbar-brand-wrapper d-flex w-100">
                    <img src="images/Group2.svg" alt />
                    <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="mdi mdi-menu navbar-toggler-icon" />
                    </button> 
                    </div>
                    <div className="collapse navbar-collapse navbar-menu-wrapper" id="navbarSupportedContent">
                    <ul className="navbar-nav align-items-lg-center align-items-start ml-auto">
                        <li className="d-flex align-items-center justify-content-between pl-4 pl-lg-0">
                        <div className="navbar-collapse-logo">
                            <img src="images/Group2.svg" alt />
                        </div>
                        <button className="navbar-toggler close-button" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="mdi mdi-close navbar-toggler-icon pl-5" />
                        </button>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#header-section">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#features-section">About</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#form-atas">Pengaduan</a>  
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#feedback-section">Testimonials</a>
                        </li>
                        <li className="nav-item btn-contact-us pl-4 pl-lg-0">
                            <button className="btn btn-info" onClick={e => logout(e)}>Logout</button>
                        </li>
                        
                    </ul>
                    </div>
                </div> 
                </nav>   
            </header>
        <div className="banner">
          <div className="container">
            <h1 className="font-weight-semibold">Layanan Aspirasi &amp;<br />Pengaduan Masyarakat Online.</h1>
            <h6 className="font-weight-normal text-muted pb-3">Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang.</h6>       
            <div>
              <button className="btn btn-opacity-light mr-1">Get started</button>
              <button className="btn btn-opacity-success ml-1">Learn more</button>
            </div>
            <img src="images/Group171.svg" alt className="img-fluid" />
          </div>
        </div>
        <div className="content-wrapper">
          <div className="container">
            <section className="features-overview" id="features-section">
              <div className="content-header">
                <h2>How does it works</h2>
                <h6 className="section-subtitle text-muted">One theme that serves as an easy-to-use operational toolkit<br />that meets customer's needs.</h6>
              </div>
              <div className="d-md-flex justify-content-between">
                <div className="grid-margin d-flex justify-content-start" data-aos="fade-right" data-aos-delay="50" data-aos-duration="1000">
                  <div className="features-width">
                    <img src="images/Group12.svg" alt className="img-icons" />
                    <h5 className="py-3">Speed<br />Optimisation</h5>
                    <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <a href="#"><p className="readmore-link">Readmore</p></a>  
                  </div>
                </div>
                <div className="grid-margin d-flex justify-content-center" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                  <div className="features-width">
                    <img src="images/Group7.svg" alt className="img-icons" />
                    <h5 className="py-3">SEO and<br />Backlinks</h5>
                    <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <a href="#"><p className="readmore-link">Readmore</p></a>
                  </div>
                </div>
                <div className="grid-margin d-flex justify-content-end" data-aos="fade-left" data-aos-delay="50" data-aos-duration="1000">
                  <div className="features-width">
                    <img src="images/Group5.svg" alt className="img-icons" />
                    <h5 className="py-3">Content<br />Marketing</h5>
                    <p className="text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <a href="#"><p className="readmore-link">Readmore</p></a>
                  </div>
                </div>
              </div>
            </section>     
            <div id="form-atas"></div>
            <section className="digital-marketing-service" id="digital-marketing-section">
        <div class="box" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000" id="box-form">
          <div class="shadow p-3 mr-5 ml-5 text-white text-center rounded"><marquee direction="right">Sampaikan Apirasi Dan Laporan Anda Di sini</marquee></div>
              <form onSubmit={e => handleSubmit(e)}>
                <input type="text"  type="hidden" 
                      value={localStorage.getItem('nama')} 
                      name="nama"/>
                    <div className="form-group pt-5 pr-5 pl-5">
                      <label htmlFor="Name">Judul Laporan</label>
                        <input 
                          type="text"
                          className="form-control" 
                          id="judul" 
                          placeholder="ketik judul laporan"
                          name="judul"
                          />
                    </div>
                    <div className="form-group pr-5 pl-5">
                      <label htmlFor="Email">Isi Laporan</label>
                      <input 
                          type="text" 
                          className="form-control" 
                          id="isi" 
                          placeholder="Ketik isi laporan"  
                          name="isi"
                          />
                    </div>
                    <div className="form-group pr-5 pl-5">
                      <label htmlFor="Message">Tanggal</label>
                      <input 
                          type="date" 
                          className="form-control" 
                          id="tanggal" 
                          placeholder="Ketik isi tanggal"
                          name="tanggal"
                          />
                    </div>
                     <div class="form-group pr-5 pl-5">
                        <label for="exampleFormControlSelect1">Lokasi Kejadian</label>
                        <select 
                          class="form-control" 
                          id="exampleFormControlSelect1"
                          name="provinsi"
                          onChange={e => setIdProvinsi(e.target.value)}
                         >
                         <option selected>Pilih Provinsi</option>
                            {datakota ?
                              datakota.map((item) => {
                                return (
                                  <>
                                    <option key={item.id} value={item.id}>{item.nama}</option>
                                  </>
                                )
                              })
                                :
                              <option>Tidak Ada Data Provinsi</option>
                            }
                        </select>
                      </div>
                      <div class="form-group pr-5 pl-5">
                        <label for="exampleFormControlSelect1">Kota Kejadian</label>
                        <select 
                          class="form-control" 
                          id="exampleFormControlSelect1"
                          name="kota"
                         >
                         <option selected>Pilih Kota</option>
                            {kotapilih ?
                              kotapilih.map((item) => {
                                return (
                                  <>
                                    <option key={item.id} value={item.nama}>{item.nama}</option>
                                  </>
                                )
                              })
                                :
                              <option>Tidak Ada Data Kota</option>
                            }
                        </select>
                      </div>
                      <div className="form-group pr-5 pl-5">
                      <label htmlFor="Message">Upload Lampiran</label>
                      <input 
                          type="file" 
                          className="form-control" 
                          id="gambar" 
                          placeholder="masukan gambar" 
                          name="gambar"
                          />
                    </div>
                      <div class="form-group pr-5 pl-5 pb-5">
                          <label>Kategori Pengaduan</label>
                          <select 
                              class="form-control"
                              name="kategori"
                              >
                           <option selected>Pilih Pengaduan</option>
                            {kategori ?
                              kategori.map((item) => {
                                return (
                                  <>
                                    <option key={item.id} value={item.id}>{item.nama_kategori}</option>
                                  </>
                                )
                              })
                                :
                              <option>Tidak Ada Data Kategori</option>
                            }
                          </select>
                          <button type="submit" class="btn btn-primary mt-4">Submit</button>
                      </div>
                      
                </form>
        </div>
      </section>    
            {/* content */}
            <section className="case-studies" id="case-studies-section">
            <div className="row grid-margin">
            <div className="col-12 text-center pb-5">
                <h2>Our case studies</h2>
                <h6 className="section-subtitle text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum.</h6>
            </div>
            <div className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0" data-aos="zoom-in">
                <div className="card color-cards">
                <div className="card-body p-0">
                    <div className="bg-primary text-center card-contents">
                    <div className="card-image">
                        <img src="images/Group95.svg" className="case-studies-card-img" alt />
                    </div>  
                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                        <h6 className="text-white pb-2 px-3">Know more about Online marketing</h6>
                        <button className="btn btn-white">Read More</button>
                        </div>
                    </div>
                    </div>   
                    <div className="card-details text-center pt-4">
                    <h6 className="m-0 pb-1">Online Marketing</h6>
                    <p>Seo, Marketing</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0" data-aos="zoom-in" data-aos-delay={200}>
                <div className="card color-cards">
                <div className="card-body p-0">
                    <div className="bg-warning text-center card-contents">
                    <div className="card-image">
                        <img src="images/Group108.svg" className="case-studies-card-img" alt />
                    </div>  
                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                        <h6 className="text-white pb-2 px-3">Know more about Web Development</h6>
                        <button className="btn btn-white">Read More</button>
                        </div>
                    </div>
                    </div>   
                    <div className="card-details text-center pt-4">
                    <h6 className="m-0 pb-1">Web Development</h6>
                    <p>Developing, Designing</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0" data-aos="zoom-in" data-aos-delay={400}>
                <div className="card color-cards">
                <div className="card-body p-0">
                    <div className="bg-violet text-center card-contents">
                    <div className="card-image">
                        <img src="images/Group126.svg" className="case-studies-card-img" alt />
                    </div>  
                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                        <h6 className="text-white pb-2 px-3">Know more about Web Designing</h6>
                        <button className="btn btn-white">Read More</button>
                        </div>
                    </div>
                    </div>   
                    <div className="card-details text-center pt-4">
                    <h6 className="m-0 pb-1">Web Designing</h6>
                    <p>Designing, Developing</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3 stretch-card" data-aos="zoom-in" data-aos-delay={600}>
                <div className="card color-cards">
                <div className="card-body p-0">
                    <div className="bg-success text-center card-contents">
                    <div className="card-image">
                        <img src="images/Group115.svg" className="case-studies-card-img" alt />
                    </div>  
                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                        <div>
                        <h6 className="text-white pb-2 px-3">Know more about Software Development</h6>
                        <button className="btn btn-white">Read More</button>
                        </div>
                    </div>
                    </div>   
                    <div className="card-details text-center pt-4">
                    <h6 className="m-0 pb-1">Software Development</h6>
                    <p>Developing, Designing</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>     
            <section className="customer-feedback" id="feedback-section">
            <div className="row">
            <div className="col-12 text-center pb-5">
                <h2>What our customers have to say</h2>
                <h6 className="section-subtitle text-muted m-0">Lorem ipsum dolor sit amet, tincidunt vestibulum.</h6>
            </div>
            <div className="owl-carousel owl-theme grid-margin">
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face2.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Tony Martinez</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face3.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Sophia Armstrong</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face20.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Cody Lambert</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face15.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Cody Lambert</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face16.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Cody Lambert</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face1.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Tony Martinez</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face2.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Tony Martinez</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face3.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Sophia Armstrong</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
                <div className="card customer-cards">
                <div className="card-body">
                    <div className="text-center">
                    <img src="images/face20.jpg" width={89} height={89} alt className="img-customer" />
                    <p className="m-0 py-3 text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum. Fusce egeabus consectetuer turpis, suspendisse.</p>
                    <div className="content-divider m-auto" />
                    <h6 className="card-title pt-3">Cody Lambert</h6>
                    <h6 className="customer-designation text-muted m-0">Marketing Manager</h6>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </section>
            <section className="contact-us" id="contact-section">
            <div className="contact-us-bgimage grid-margin">
            <div className="pb-4">
                <h4 className="px-3 px-md-0 m-0" data-aos="fade-down">Do you have any projects?</h4>
                <h4 className="pt-1" data-aos="fade-down">Contact us</h4>
            </div>
            <div data-aos="fade-up">
                <button className="btn btn-rounded btn-outline-danger">Contact us</button>
            </div>          
            </div>
            </section>
            {/* Footer */}
            <section className="contact-details" id="contact-details-section">
                <div className="row text-center text-md-left">
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <img src="images/Group2.svg" alt className="pb-2" />
                    <div className="pt-2">
                    <p className="text-muted m-0">mikayla_beer@feil.name</p>
                    <p className="text-muted m-0">906-179-8309</p>
                    </div>         
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Get in Touch</h5>
                    <p className="text-muted">Don’t miss any updates of our new templates and extensions.!</p>
                    <form>
                    <input type="text" className="form-control" id="Email" placeholder="Email id" />
                    </form>
                    <div className="pt-3">
                    <button className="btn btn-dark">Subscribe</button>
                    </div>   
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Our Guidelines</h5>
                    <a href="#"><p className="m-0 pb-2">Terms</p></a>   
                    <a href="#"><p className="m-0 pt-1 pb-2">Privacy policy</p></a> 
                    <a href="#"><p className="m-0 pt-1 pb-2">Cookie Policy</p></a> 
                    <a href="#"><p className="m-0 pt-1">Discover</p></a> 
                </div>
                <div className="col-12 col-md-6 col-lg-3 grid-margin">
                    <h5 className="pb-2">Our address</h5>
                    <p className="text-muted">518 Schmeler Neck<br />Bartlett. Illinois</p>
                    <div className="d-flex justify-content-center justify-content-md-start">
                    <a href="#"><span className="mdi mdi-facebook" /></a>
                    <a href="#"><span className="mdi mdi-twitter" /></a>
                    <a href="#"><span className="mdi mdi-instagram" /></a>
                    <a href="#"><span className="mdi mdi-linkedin" /></a>
                    </div>
                </div>
                </div>  
            </section>
            <footer className="border-top">
                <p className="text-center text-muted pt-4">Copyright © 2019<a href="https://www.bootstrapdash.com/" className="px-1">Bootstrapdash.</a>All rights reserved.</p>
            </footer> 
            {/* Modal for Contact - us Button */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="exampleModalLabel">Contact Us</h4>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="Name">Name</label>
                        <input type="text" className="form-control" id="Name" placeholder="Name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <input type="email" className="form-control" id="Email-1" placeholder="Email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="Message">Message</label>
                        <textarea className="form-control" id="Message" placeholder="Enter your Message" defaultValue={""} />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
 
        </>
    )
}

export default DashboardScreen