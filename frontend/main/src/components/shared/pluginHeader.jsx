import React, {useEffect} from "react";
import Parcel from "single-spa-react/parcel";
import { pluginHeader } from "@zuri/plugin-header";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import appActions from "../../redux/actions/app";
import { bindActionCreators } from "redux";
import {FiHash} from "react-icons/fi"
import { BiLockAlt } from "react-icons/bi"
import { Icon } from "@chakra-ui/icon";
import { useDisclosure } from "@chakra-ui/hooks";
import ChannelDetails from "../channelDetailsAndSetting/channelDetailsAndSettings";
import hashImage from "./assets/default.png";



const NewChannelHeader = ({channelId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

 // const {channelId} = useParams();
  //console.log("This is a test",channelId)

  const org_id = '614679ee1a5607b13c00bcb7';//Test value for org id
  const channel_id = channelId; //assigning dynamic channel id to channel_id

  const dispatch = useDispatch();
  const {_getChannelDetails } = bindActionCreators(appActions, dispatch);//extract redux function

  const loadChannelDetails = async () => { 

    await _getChannelDetails(org_id, channel_id);

  };

  useEffect(() => { 

    loadChannelDetails(); 

  }, [channelId]);

  const { channelDetails } = useSelector((state) => state.channelsReducer);//extract redux state
  console.log(channelDetails);//to see what kind of data I'm actually getting

  const isPrivate = channelDetails.private;// to check if channel is private or not

  const icon = hashImage;
  // {isPrivate ? icon = <Icon as={ BiLockAlt } color="#ffffff" h={5} w={5} mr={2}  /> : icon = <Icon as={ FiHash } color="#ffffff" h={5} w={5} mr={2} />};

  const pluginConfig = {
    name: channelDetails.name, //Name on header
    icon: icon , //Image on header
    thumbnailUrl: [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg",
      "https://www.kemhospitalpune.org/wp-content/uploads/2020/12/Profile_avatar_placeholder_large.png",
    ], //Replace with images of users
    userCount: channelDetails.members, //User count on header
    eventTitle: () => {
      <ChannelDetails isOpen={isOpen} onClose={onClose} />//Block of code to be triggered on title click
    },
    eventThumbnail: () => {
      <ChannelDetails isOpen={isOpen} onClose={onClose} />//Block of code to be triggered on thumbnail click
    },
    hasThumbnail: true, //set false if you don't want thumbnail on the header
  };
  return (
    <Parcel
      config={pluginHeader}
      wrapWith="div"
      wrapStyle={{ width: "100%" }}
      headerConfig={pluginConfig}
    />
  );
};

export default NewChannelHeader;