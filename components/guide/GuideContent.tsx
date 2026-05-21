import Link from 'next/link';
import Image from 'next/image';
import { CardHead } from '@/components/ui/CardHead';
import { CopyButton } from '@/components/ui/CopyButton';
import { Logo } from '@/components/ui/Logo';
import { Seagull } from '@/components/ui/Seagull';
import { FoodSpotCard } from '@/components/guide/FoodSpotCard';
import { MapFigure } from '@/components/guide/MapFigure';
import { FOOD_CATEGORIES } from '@/data/food-spots';
import {
  INSTAGRAM_DM_URL,
  KAKAO_CAR_URL,
  KAKAO_TRANSIT_URL,
  WIFI,
} from '@/lib/site';

export function GuideContent() {
  return (
    <main id="top">
      <section className="hero">
        <div className="hero-logo">
          <Logo />
        </div>
        <h1 className="hero-title">
          <em>Welcome</em>
          <span>해묘서가에 오신 것을 환영합니다</span>
        </h1>
        <div className="hero-copy toggle">
          <p lang="ko">
            안녕하세요, 해묘서가를 찾아주셔서 진심으로 감사드립니다.
            <br />
            비록 오래된 구옥이지만 머무시는 동안 편히 쉬었다 가실 수 있도록 최선을
            다하겠습니다.
            <br />
            쾌적하고 안전한 휴식을 위해 아래 안내 사항을 꼭 확인해 주세요.
          </p>
          <p lang="en">
            Thank you sincerely for choosing Haemyo.
            <br />
            Though it is an old house, we will do our best so you can rest comfortably
            during your stay.
            <br />
            Please read the guidelines below for a pleasant and safe visit.
          </p>
        </div>
        <Seagull />
      </section>

      <section id="checkin" className="card">
        <CardHead en="Check-in & Check-out" ko="체크인 & 체크아웃" />
        <div className="block-body toggle">
          <ul lang="ko" className="bare-list guide-rules">
            <li>
              체크인 시간은 <strong>오후 3시</strong>, 체크아웃 시간은{' '}
              <strong>오전 11시</strong>입니다.
            </li>
            <li>
              정오 이후 트렁크나 짐을 맡기실 수 있습니다. 객실 준비가 일찍 끝날 경우
              얼리 체크인이 가능하며 메시지로 안내해 드립니다.
            </li>
            <li>대문과 현관 도어락 비밀번호는 입실 당일 발송해 드립니다.</li>
          </ul>
          <ul lang="en" className="bare-list guide-rules">
            <li>
              Check-in <strong>3:00 PM</strong> · Check-out <strong>11:00 AM</strong>.
            </li>
            <li>
              Luggage drop-off is available after noon. If the room is ready early, we
              may offer early check-in and will notify you by message.
            </li>
            <li>Gate and entrance door-lock codes are sent on the day of arrival.</li>
          </ul>
        </div>
      </section>

      <section id="arrival" className="card">
        <CardHead en="Parking & directions" ko="주차 및 오시는 길" />
        <div className="card-block">
          <h3 className="block-head">
            <em>Parking</em>
            <span>주차</span>
          </h3>
          <div className="block-body toggle">
            <p lang="ko">
              주차는 도보 1분 거리에 있는 공영주차장을 이용할 수 있습니다. 도로
              양옆에 공간이 있을 경우 그곳에 주차하셔도 됩니다.
            </p>
            <p lang="en">
              Use the public parking lot about a 1-minute walk away, or park along the
              roadside where space is available.
            </p>
          </div>
        </div>
        <div className="card-block">
          <h3 className="block-head">
            <em>By transit</em>
            <span>대중교통</span>
          </h3>
          <ul className="block-list toggle">
            <li lang="ko">
              <strong>202번</strong> 제주버스터미널 방면 · 한림천주교회 정류장 하차
            </li>
            <li lang="ko">
              <strong>202번</strong> 서귀포 방면 · 한림매일시장 입구 정류장 하차
            </li>
            <li lang="ko">
              <strong>102번</strong> 급행버스 · 양방향 모두 한림환승정류장 하차
            </li>
            <li lang="en">
              <strong>Bus 202</strong> toward Jeju Bus Terminal · get off at Hallim
              Catholic Church stop
            </li>
            <li lang="en">
              <strong>Bus 202</strong> toward Seogwipo · get off at Hallim Maeil Market
              entrance stop
            </li>
            <li lang="en">
              <strong>Bus 102</strong> express · both directions, get off at Hallim
              transfer stop
            </li>
          </ul>
        </div>
        <div className="address toggle">
          <p lang="ko">
            <strong>주소</strong> · 제주특별자치도 제주시 한림읍 대림1길 1-1
          </p>
          <p lang="en">
            <strong>Address</strong> · 1-1 Daerim 1-gil, Hallim-eup, Jeju-si, Jeju-do
          </p>
        </div>
        <div className="route-buttons">
          <a className="route-btn" href={KAKAO_TRANSIT_URL} target="_blank" rel="noopener noreferrer">
            <span className="route-btn-en">By transit</span>
            <span className="route-btn-ko">대중교통 길찾기</span>
            <span className="route-btn-meta">제주공항 → 해묘서가 · KakaoMap</span>
          </a>
          <a className="route-btn" href={KAKAO_CAR_URL} target="_blank" rel="noopener noreferrer">
            <span className="route-btn-en">By car</span>
            <span className="route-btn-ko">자동차 길찾기</span>
            <span className="route-btn-meta">제주공항 → 해묘서가 · KakaoMap</span>
          </a>
        </div>
        <MapFigure />
        <div className="callout toggle">
          <p lang="ko">
            ※ 대림1길은 좁은 골목입니다. 한림로에서 대림1길 표지판을 보고 진입한 뒤,
            골목 안쪽 <strong>1-1번지</strong>까지 천천히 들어오시면 해묘서가 대문이
            있습니다.
          </p>
          <p lang="en">
            Note · Daerim 1-gil is a narrow alley. Once you turn from Hallim-ro, walk
            slowly into the alley to <strong>building 1-1</strong> — Haemyo is on your
            right.
          </p>
        </div>
      </section>

      <section id="library" className="card">
        <CardHead en="The library" ko="서가 이용 안내" />
        <div className="block-body toggle">
          <p lang="ko">
            책장에 비치된 모든 책은 자유롭게 읽으실 수 있습니다. 다음 손님을 위해 읽고
            난 뒤 <strong>제자리에 놓아주시면</strong> 감사하겠습니다.
          </p>
          <p lang="ko">
            해묘서가에 비치된 책에는 호스트 부부의 소중한 추억이 깃들어 있습니다.
            혹시라도 집에 데려가지 말아주세요.
          </p>
          <p lang="en">
            Every book on the shelves is yours to read during your stay. When you are
            finished, <strong>please return it to its place</strong> for the next guest.
          </p>
          <p lang="en">
            These books hold precious memories for us as hosts. Please do not take any
            book home with you.
          </p>
        </div>
      </section>

      <section id="room" className="card">
        <CardHead en="Room guide" ko="객실 이용 안내" />
        <div className="card-block">
          <div className="block-body toggle">
            <ul lang="ko" className="bare-list guide-rules">
              <li>
                해묘서가는 좋은 이웃과 담벼락을 나누고 있습니다. 마당에서 발생하는
                소음은 곧바로 담을 넘어 이웃의 귓가로 생생하게 달려가니,{' '}
                <strong>늦은 시간에는 특히 조심</strong>해 주시면 감사하겠습니다.
              </li>
              <li>
                해묘서가는 한림항 바로 옆이라, 밤에 뱃고동이나 무전 소리가 간혹 들릴
                수 있습니다. 잠이 가벼우시면 객실에 준비해 둔{' '}
                <strong>이어플러그</strong>를 사용해 보세요.
              </li>
              <li>
                취사는 <strong>6박 이상</strong> 머무시는 손님에 한해 허용됩니다. 외부
                음식 반입은 자유롭습니다. 아래{' '}
                <Link href="/guide#food">도보맛집</Link> 리스트를 참고해 방문하시거나
                포장해 즐기셔도 좋습니다.
              </li>
              <li>
                서재는 별도 방문 없이 <strong>커튼</strong>으로 나눈 공간입니다. 쉬실
                때나 밤에는 커튼을 내려 주시면 시선·소음 모두 조금 더 편하실 거예요.
              </li>
              <li>흡연은 평상 옆에 마련된 재떨이를 이용해 주세요.</li>
              <li>
                제주에는 돌, 바람, 여자 뿐만 아니라 온갖 벌레들도 많습니다. 주기적인
                방역을 통해 최대한 집 안에 들어오지 못하게 막고 있으나, 작은 빈틈을
                놓치지 않고 기어코 들어오고야마는 녀석들도 있습니다. 너그러이 양해해
                주시되, 큰 벌레가 나타나 퇴치가 어려울 경우엔{' '}
                <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
                  인스타그램 DM
                </a>
                으로 알려 주세요.
              </li>
              <li>
                대문에는 자동 도어락이 설치되어 있으나, 도어락이 잠길 때까지 손으로
                잡아주어야 합니다. 자동으로 문이 찰칵하고 닫히지 않으니, 대문을
                들어오고 나가실 때 <strong>도어락 잠금 장치가 잠길 때까지</strong>{' '}
                손으로 잡아 주세요.
              </li>
              <li>
                <strong>봄가을서가</strong>는 사계절 이용 가능하지만 여름엔 덥고
                겨울엔 춥습니다. 외부 창고 공간이라 냉난방이 어려운 점 양해
                부탁드립니다.
              </li>
              <li>
                <strong>2박 이상</strong> 머무시는 손님께서는 욕실의 세탁기·건조기를
                자유롭게 사용하실 수 있습니다. 사용법은 첨부 안내문을 참조해 주세요.
              </li>
            </ul>
            <ul lang="en" className="bare-list guide-rules">
              <li>
                We share a wall with good neighbors — sound from the yard travels
                easily. Please be especially <strong>quiet at night</strong>.
              </li>
              <li>
                We&apos;re right beside Hallim Port — boat horns or radio chatter may
                reach you at night. <strong>Earplugs</strong> are in the room if
                you&apos;d like a quieter sleep.
              </li>
              <li>
                Cooking is allowed for stays of <strong>6 nights or more</strong>.
                Outside food is welcome — see our{' '}
                <Link href="/guide#food">walking-distance food guide</Link> or bring
                takeout.
              </li>
              <li>
                The study has no separate door — a <strong>curtain</strong> divides
                the space. Please draw it closed when you rest, especially at night,
                for a bit more privacy and quiet.
              </li>
              <li>Please smoke only at the ashtray beside the platform.</li>
              <li>
                Jeju has its share of insects despite regular pest control. Please
                understand; message us on{' '}
                <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
                  Instagram DM
                </a>{' '}
                if a large one is hard to remove.
              </li>
              <li>
                The main gate has an auto lock — please <strong>hold the door</strong>{' '}
                until it locks when entering or leaving.
              </li>
              <li>
                The <strong>Spring–Autumn room</strong> is open year-round but hot in
                summer and cold in winter (outdoor storage space, no HVAC).
              </li>
              <li>
                Guests staying <strong>2+ nights</strong> may use the washer and dryer
                in the bathroom — see the attached guide.
              </li>
            </ul>
          </div>
        </div>

        <div className="card-block" id="wifi">
          <h3 className="block-head">
            <em>WiFi</em>
            <span>와이파이</span>
          </h3>
          <div className="wifi-grid">
            <div className="wifi-info">
              <dl>
                <dt className="toggle">
                  <span lang="ko">네트워크</span>
                  <span lang="en">Network</span>
                </dt>
                <dd>
                  <code>{WIFI.ssid}</code>
                </dd>
                <dt className="toggle">
                  <span lang="ko">비밀번호</span>
                  <span lang="en">Password</span>
                </dt>
                <dd>
                  <code>{WIFI.password}</code>
                </dd>
              </dl>
              <p className="wifi-note toggle">
                <span lang="ko">QR을 카메라로 스캔하면 자동 연결됩니다.</span>
                <span lang="en">Scan the QR with your camera to connect automatically.</span>
              </p>
              <CopyButton
                text={WIFI.password}
                labelKo="비밀번호 복사"
                labelEn="Copy password"
              />
            </div>
            <div className="wifi-qr">
              <Image
                src={WIFI.qrUrl}
                alt="WiFi QR"
                width={180}
                height={180}
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="card-block" id="speaker">
          <h3 className="block-head">
            <em>Room audio · Marshall Acton III</em>
            <span>스피커 사용법</span>
          </h3>
          <ol className="block-list numbered toggle">
            <li lang="ko">
              <strong>전원</strong> · 상단 우측 토글을 위로 ↑
            </li>
            <li lang="ko">
              <strong>페어링</strong> · SOURCE 버튼을 길게 눌러 BT LED가 빨간색으로
              깜박일 때까지
            </li>
            <li lang="ko">
              <strong>연결</strong> · 휴대폰 블루투스에서 <code>ACTON III</code> 선택
            </li>
            <li lang="en">
              <strong>Power</strong> · Flip the right toggle up ↑
            </li>
            <li lang="en">
              <strong>Pair</strong> · Hold SOURCE until the BT LED pulses red
            </li>
            <li lang="en">
              <strong>Connect</strong> · Select <code>ACTON III</code> in your
              phone&apos;s Bluetooth settings
            </li>
          </ol>
          <p className="speaker-tip toggle">
            <span lang="ko">
              ※ 음량은 왼쪽 노브로 조절합니다. BASS·TREBLE의 빨간 점이 12시일 때가 기본
              음질입니다.
            </span>
            <span lang="en">
              ※ Volume is the leftmost knob. Default tone is when the BASS·TREBLE red
              dots align at 12 o&apos;clock.
            </span>
          </p>
          <div className="callout toggle">
            <ul lang="ko" className="bare-list">
              <li>22시 이후에는 음량 5 이하로 부탁드립니다</li>
              <li>10분 미사용 시 자동 절전 모드</li>
              <li>사용 후에는 토글을 내려 전원을 꺼주세요</li>
            </ul>
            <ul lang="en" className="bare-list">
              <li>After 10 pm · please keep the volume at 5 or below</li>
              <li>Auto-standby kicks in after 10 minutes of inactivity</li>
              <li>Please switch off via the toggle when finished</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="food" className="card food-guide">
        <CardHead en="Host picks" ko="도보맛집" />
        <p className="food-intro">
          해묘서가는 읍내 중심가에 가까워 도보로 로컬 맛집 탐방이 가능합니다.
          해묘서가에 머무시는 동안 이 리스트를 참조해서 맛있는 여행을 떠나 보세요.
        </p>
        {FOOD_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className={`food-category${cat.drive ? ' food-category--drive' : ''}`}
          >
            <h3 className="food-cat-head">{cat.title}</h3>
            {cat.note ? <p className="food-cat-note">{cat.note}</p> : null}
            {cat.spots.map((spot) => (
              <FoodSpotCard key={spot.name} spot={spot} />
            ))}
          </div>
        ))}
        <p className="food-note">
          ※ 영업시간·휴무일·메뉴는 변동될 수 있으니 방문 전에 확인해 주세요.
        </p>
      </section>
    </main>
  );
}
