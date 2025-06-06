import { StyleSheet } from "react-native";

const colors = {
  primary: "#55A57F",
  secondary: "#7C6DDD",
  dark: "#333",
  white: "#fff",
  gray: "#999",
  lightGray: "#F2F2F2",
  border: "#ddd",
  error: "#FF0000",
  button: "#34D186",
  black: "#000000",
};

export const HomePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 0,
  },
  greetingSection: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    position: "relative",
    height: 210,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    color: "white",
    marginTop: 0,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    height: 132,
  },
  statBox: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.secondary,
    marginTop: 15,
  },
  scheduleButton: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  scheduleButtonText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
  upcomingContainer: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingBottom: 550,
  },
  pickupCard: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginHorizontal: 0,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    borderColor: colors.gray,
    borderWidth: 1,
    overflow: "hidden",
  },

  truckIcon: {
    width: 80,
    height: 50,
  },
  pickupDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 20,
  },
  pickupTime: {
    fontSize: 16,
    color: colors.gray,
    marginHorizontal: 20,
    marginTop: 5,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
  },
  noDataText: {
    fontSize: 20,
    color: colors.black,
    marginTop: 20,
    fontWeight: "bold",
  },
  noDatasubText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 10,
  },
  scheduleCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

binImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 16,
},

binDetails: {
  flex: 1,
  justifyContent: 'center',
},

scheduleDate: {
  fontSize: 16,
  fontWeight: '600',
  color: '#222',
  marginBottom: 4,
},

scheduleTime: {
  fontSize: 14,
  color: '#666',
  marginBottom: 3,
},

binPrice: {
  fontSize: 15,
  fontWeight: '700',
  color: '#2E7D4F',
},
});


export const SchedulePage = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginBottom: 80,
  },
  header: {
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 0,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  notificationIconWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  notificationIcon: {
    color: 'white',
    paddingTop: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', 
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  scheduleCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
},

binImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 16,
},

binDetails: {
  flex: 1,
  justifyContent: 'center',
},

scheduleDate: {
  fontSize: 16,
  fontWeight: '600',
  color: '#222',
  marginBottom: 4,
},

scheduleTime: {
  fontSize: 14,
  color: '#666',
  marginBottom: 3,
},

binPrice: {
  fontSize: 15,
  fontWeight: '700',
  color: '#2E7D4F',
},

priceStatusContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},

statusBadge: {
  borderRadius: 20,
  paddingVertical: 4,
  paddingHorizontal: 12,
},
updatedText: {
  fontSize: 12,
  color: '#888',
  marginTop: 4,
},

statusText: {
  fontWeight: '600',
  fontSize: 12,
},

  scrollContainer: {
    flexGrow: 1,
  },
  scheduleList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#7C6DDD',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  lottieAnimation: {
    width: 250,
    height: 250,
  },
  noDataText: {
    fontSize: 20,
    color: colors.black,
    marginTop: 20,
    fontWeight: "bold",
  },
  noDatasubText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 10,
  },
});

export const ScheduleScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#55A57F',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 0,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
  },
  notificationIconWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  notificationIcon: {
    color: 'white',
    paddingTop: 10
  },
  addressContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  address: {
    borderColor: '#ccc',
  },
  addressCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    width: 300,
    position: 'relative',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  locationInput: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flex: 1,
    borderRadius: 10,
    height: 40,
  },
  dropDownStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    marginTop: 0,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft : 20,
  },
  checkboxText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  binListContainer: {
    maxHeight: 320,
    paddingHorizontal: 20,
    marginBottom: 200,
  },
  binContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedBin: {
    borderColor: '#34D186',
    borderWidth: 2,
  },
  binImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  binDetails: {
    flex: 1,
  },
  binName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  binSize: {
    fontSize: 14,
    color: '#555',
  },
  binBags: {
    fontSize: 12,
    color: '#777',
  },
  closeButton: {
    position: 'absolute',
    top: -35,
    right: 5,
    padding: 5,
    backgroundColor: '#777',
    borderRadius: 15,
    width: 25,
    height: 25,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    shadowRadius: 3,
    // elevation: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  price: {
    fontSize: 14,
    color: '#34D186',
    fontWeight: 'bold',
    marginTop: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    fontSize: 10,
    padding: 10,
    backgroundColor: '#5555',
    textAlign: 'center',
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C6DDD',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    // marginTop: 15,
    marginBottom: 30,
  },
  scheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  sectionTitletop: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  sectionSubtext: {
    fontSize: 14,
    color: '#555',
    marginTop: 1,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  sectionTitlemid: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: -5,
  },
  sectionTitledown: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  scrollview:{
    // marginBottom: 530,
  },
  plusIconContainer: {
    position: 'absolute',
    right: -55, 
    top: '30%',
    transform: [{ translateY: -15 }],
    // borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: '#7C6DDD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#55A57F',
  },
  modalButton: {
    backgroundColor: '#7C6DDD',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 5,
    // marginBottom: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  ModalSubCancel:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
    marginTop: 30,
    width: '90%',
  },
  datePickerContainer: {
    marginTop: 5,
    padding: 10,
    // backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
    marginLeft: -25,
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    // backgroundColor: '#F0F0F0',
    borderRadius: 10,
  },
  generatedDateText:{
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
    fontWeight: 'bold',
    marginLeft: 15
  ,
  }
});
