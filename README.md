# Mates4ever
![example workflow](https://github.com/aldiiicastro/mates4ever/actions/workflows/backTest.yml/badge.svg)
![example workflow](https://github.com/aldiiicastro/mates4ever/actions/workflows/frontTest.yml/badge.svg)
[![codecov](https://codecov.io/gh/aldiiicastro/mates4ever/branch/main/graph/badge.svg?token=C32HVTNM8W)](https://codecov.io/gh/aldiiicastro/mates4ever)
![check-code-coverage](https://img.shields.io/badge/code--coverage-75%25-yellow)
## Instalación


`git clone https://github.com/aldiiicastro/mates4ever.git ` 

### Frontend
``` 
cd frontend
npm install
``` 
React Native te permite visualizar la aplicacion directamente desde tu telefono con un QR que se genera al levantar la aplicación. Para esto es necesario tener instalado [Expo](https://expo.dev/) en tu telefono

Otra opcion de visualizar la aplicacion es con un simulador. Para esto sera necesario contar con XCode para iOS o Android Build Tools para usar el simulador de Android. Luego de eso solo bastara con correr
``` 
npm run ios
ó
npm run android
``` 

### Backend
``` 
cd backend
``` 
Para correr el backend sera suficiente con entrar a la IDE ir a la carpeta `src/main/kotlin/mate4ever/ttip/TtipApplication.kt` y hacer click en el boton start
