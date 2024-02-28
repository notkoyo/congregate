import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="flex min-h-36 flex-col items-center justify-center px-20 md:flex-row md:justify-between">
        <span className="hidden font-satoshi font-semibold text-gray-400/40 md:block">
          © 2024 Congregate Ltd. All rights reserved.
        </span>
        <div>
          <ul className="flex gap-x-10">
            <li>
              <Popover>
                <PopoverTrigger>
                  <Link
                    as="button"
                    className="text-black transition duration-300 hover:text-black/40"
                  >
                    <DiamondIcon />
                  </Link>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-5 font-satoshi font-semibold">
                    <h3 className="cursor-default text-xl text-black">
                      Check out the developers!
                    </h3>
                    <Divider className="my-4" />
                    <ul className="flex flex-col gap-2">
                      <li>
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <User
                              isFocusable
                              as="button"
                              name="Kaiden Riley"
                              description="Junior Fullstack Developer"
                              className="transition-transform"
                              avatarProps={{
                                src: "https://media.licdn.com/dms/image/D4E03AQFGntLsoNhW4Q/profile-displayphoto-shrink_200_200/0/1708263153007?e=1714003200&v=beta&t=M6PS1qWGGQ5pmEr1NPfm68hco8DUwqGC4XpX1wj_-cA",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <UserCard
                              name={"Kaiden Riley"}
                              emoji={"🚀"}
                              linkedInHref="https://linkedin.com/in/kaiden-riley"
                              gitHubHref="https://github.com/notkoyo"
                              bio={
                                "Junior Software Developer | React & TypeScript Enjoyer | Northcoders Graduate | Travelling"
                              }
                              imageSrc={
                                "https://media.licdn.com/dms/image/D4E03AQFGntLsoNhW4Q/profile-displayphoto-shrink_200_200/0/1708263153007?e=1714003200&v=beta&t=M6PS1qWGGQ5pmEr1NPfm68hco8DUwqGC4XpX1wj_-cA"
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </li>
                      <li>
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <User
                              as="button"
                              name="Joe Man"
                              description="Junior Fullstack Developer"
                              className="transition-transform"
                              avatarProps={{
                                src: "https://media.licdn.com/dms/image/D4E35AQHTq_8idxygmQ/profile-framedphoto-shrink_200_200/0/1705660145251?e=1709222400&v=beta&t=359Yh0ZgQfaK0zxAFrWHxCU-XTEWIHyIsxqQsk0PUlw",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <UserCard
                              name={"Joe Man"}
                              emoji={"🧠"}
                              linkedInHref="https://linkedin.com/in/joe-man-60b792194/"
                              gitHubHref="https://github.com/joe-man"
                              bio={
                                "Junior Software Developer | RPA Developer | BSc Mathematics"
                              }
                              imageSrc={
                                "https://media.licdn.com/dms/image/D4E35AQHTq_8idxygmQ/profile-framedphoto-shrink_200_200/0/1705660145251?e=1709222400&v=beta&t=359Yh0ZgQfaK0zxAFrWHxCU-XTEWIHyIsxqQsk0PUlw"
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </li>
                      <li>
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <User
                              as="button"
                              name="Anthony Moran"
                              description="Junior Fullstack Developer"
                              className="transition-transform"
                              avatarProps={{
                                src: "https://avatars.githubusercontent.com/u/117123909?v=4",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <UserCard
                              name={"Anthony Moran"}
                              emoji={"🐛"}
                              linkedInHref="https://linkedin.com/in/anthonymmoran/"
                              gitHubHref="https://github.com/tonymm55"
                              bio={
                                "Junior Software Developer, Northcoders software development bootcamp graduate. BEng(Hons) Mechanical Engineering, MBA Chemical Engineering."
                              }
                              imageSrc={
                                "https://avatars.githubusercontent.com/u/117123909?v=4"
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </li>
                      <li>
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <User
                              as="button"
                              name="Joe Adams"
                              description="Junior Fullstack Developer"
                              className="transition-transform"
                              avatarProps={{
                                src: "",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <UserCard
                              name={"Joe Adams"}
                              emoji={"🌍"}
                              linkedInHref="https://linkedin.com/in/joe-adams-7592621b5/"
                              gitHubHref="https://github.com/JoeAAdams"
                              bio={defaultBio}
                              imageSrc={""}
                            />
                          </PopoverContent>
                        </Popover>
                      </li>
                      <li>
                        <Popover showArrow placement="bottom">
                          <PopoverTrigger>
                            <User
                              as="button"
                              name="Dmytro Pen"
                              description="Junior Fullstack Developer"
                              className="transition-transform"
                              avatarProps={{
                                src: "https://avatars.githubusercontent.com/u/102535430?v=4",
                              }}
                            />
                          </PopoverTrigger>
                          <PopoverContent className="p-1">
                            <UserCard
                              name={"Dmytro Pen"}
                              emoji={"🎧"}
                              linkedInHref="https://www.linkedin.com/in/dmytro-pen-a79988257/"
                              gitHubHref="https://github.com/PENbDM"
                              bio={defaultBio}
                              imageSrc={
                                "https://avatars.githubusercontent.com/u/102535430?v=4"
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </li>
                    </ul>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <Link
                className="text-black transition duration-300 hover:text-black/40"
                showAnchorIcon
                anchorIcon={<GitHubIcon />}
                href="https://github.com/notkoyo/congregate-app"
                target="_blank"
              />
            </li>
            <li>
              <Link
                className="text-black transition duration-300 hover:text-black/40"
                showAnchorIcon
                anchorIcon={<FacebookIcon />}
                href="https://facebook.com"
                target="_blank"
              />
            </li>
            <li>
              <Link
                className="text-black transition duration-300 hover:text-black/40"
                showAnchorIcon
                anchorIcon={<TwitterIcon />}
                href="https://x.com"
                target="_blank"
              />
            </li>
          </ul>
        </div>
      </div>
      <span className="flex items-center justify-center pb-10 font-satoshi font-semibold text-gray-400/40 md:hidden">
        © 2024 Congregate Ltd. All rights reserved.
      </span>
    </footer>
  );
}
