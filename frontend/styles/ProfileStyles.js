import { StyleSheet } from 'react-native'
import {colors} from "./Colors"
import {width} from "./Dimension.js"

const profileStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.violet,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  coverBio: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  coverContainer: {

    position: 'relative',
  },

  coverMetaContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: 22,
  },
  locationStyle: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingBottom: 20,
    paddingLeft: 20,
  },
  coverName: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: 'center',
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  linkContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  linkRow:{
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:"flex-end"
  },
  iconRow: {
    flex: 1,
    alignItems: 'center',
  },
  masonryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 100,
    borderWidth: 3,
    height: 200,
    width: 200,
  },
  profileImageContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: colors.violet,
    width
  },
  sceneContainer: {
    marginTop: 15,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  tabBar: {
    backgroundColor: 'transparent',
    marginBottom: -10,
    marginLeft: 120,
    marginRight: 5,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: 'relative',
    zIndex: 10,
  },
  tabRow: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
  },
  tabLabelNumber: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 2,
  },
  tabLabelText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'left',
  }
})

export default profileStyles
