# undercooked

## JWT authentication u Postmanu - kako se ulogirati i koristiti JWT pri zahtjevima koji trebaju auth
### traženje tokena
POST na /api/token s Basic Auth (username, password)
username password može biti "admin" "pass" ili bilo koji drugi već registrirani korisnik
Backend vraća token -> njega spremiti negdje

### zahtjevi koji trebaju auth
authentication -> Bearer Token -> zalijepiti unutra dobiveni JWT



### Link na stranicu:
https://undercooked-frontend.onrender.com/

### Link na backend:
https://undercooked-demo.onrender.com/api/

### Admin:
username: admin \
password: pass

### Kako pokrenuti aplikaciju lokalno:

1. git clone git@github.com:Eloise-Habek/undercooked.git
2. undercooked/IzvorniKod/undercooked-frontend otvoriti u terminalu \
   2.1 npm i \
   2.2 npm start 
3. undercooked/IzvorniKod/Undercooked-Demo otvoriti u IDE-u \
   3.1 pokrenuti maven install na pom.xml \
   3.2 pokrenuti spring iz klase s main funkcijom 

React frontend se pokreće na portu 3000, a spring backend na portu 8080

### Implementirane funkcionalnosti:
1. Registracija korisnika
2. Login kao registrirani korisnik
3. Login kao admin
4. Admin ima pregled registriranih korisnika
5. Admin može obrisati korisnika
6. Pregled vlastitog profila
