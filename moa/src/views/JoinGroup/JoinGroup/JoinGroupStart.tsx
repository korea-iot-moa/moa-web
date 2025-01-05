import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useGroupStore from '../../../stores/group.store';

function JoinGroupStart() {
  const { groupId } = useParams<{ groupId: string }>();
  const navigator = useNavigate();
  const setGroupData = useGroupStore((state) => state.setGroupData); 

  const numericGroupId = Number(groupId);
  
  // useEffect(() => {
  //   if (isNaN(numericGroupId)) {
  //     alert('잘못된 접근입니다.');
  //     navigator('/');
  //   } else {
  //     setGroupData({ groupId: numericGroupId }); // 상태 업데이트
  //   }
  // }, [numericGroupId, navigate, setGroupData]);

  const handleButton = () => {
    navigator('`/join-group/group-user-answer`')
  }
  
    return (
      <div>
        <h4>모임 참여 신청</h4>
        <h4>모임참여시 주의사항</h4>
        <ul>
          <li>채팅 및 게시판에서 타인을 비방하거나 모욕하지 않습니다.</li>
          <li>허위 정보나 거짓된 내용을 올리지 않습니다.</li>
          <li>상업적 광고, 스팸성 메시지, 불법 사이트 링크를 공유하지 않습니다.</li>
          <li>모임 취소 시 정해진 규정을 준수합니다.</li>
          <li>개인정보를 허락 없이 공유하지 않습니다.</li>
          <li>욕설, 음란성 표현, 정치·종교적 갈등을 조장하지 않습니다.</li>
          <li>모임 규칙과 운영 방침을 확인하고 준수합니다.</li>
          <li>무단 불참이나 허위 신청으로 피해를 주지 않습니다.</li>
          <li>모임 중 촬영한 사진이나 영상을 타인의 동의 없이 공개하거나 공유하지 않습니다.</li>
          <li>모임 진행에 방해되는 행동(과도한 음주, 소란 등)을 하지 않습니다.</li>
        </ul>
        <p>위에 내용을 확인하셨습니까?</p>
        <button onClick={handleButton}>네, 확인했습니다.</button>
      </div>
  )
}

export default JoinGroupStart;