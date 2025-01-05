import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import JoinGroupStart from './JoinGroupStart'
import JoinGroupAnswer from './JoinGroupAnswer'
import useGroupStore from '../../../stores/group.store';

export default function Index() {
  const { groupId } = useParams<{ groupId: string }>();
  const numericGroupId = Number(groupId); 
  const navigate = useNavigate();
  const groupData = useGroupStore((state) => state.groupData);
  const setGroupData = useGroupStore((state) => state.setGroupData);

  // useEffect(() => {
  //   if (!groupData?.groupId && groupId) {
  //     setGroupData({ groupId });
  //   }
  //   navigate('/');
  // }, [groupData?.groupId, navigate]);

  return (
    <div>
      <Routes>
        <Route path={`/join-group`} element={<JoinGroupStart />}/>
        <Route path={`/join-group/group-user-answer`} element={<JoinGroupAnswer />}/>
      </Routes>
    </div>
  )
}
